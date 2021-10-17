import asyncHandler from 'express-async-handler'
import Book from '../models/book.js'
import formidable from 'formidable'
import fs from 'fs'
import extend from 'lodash/extend.js'



/**
 * @desc    Create a new book
 * @path    POST /api/books/create_book
 * @access  Private/User
 */

const createBook = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err)
        }
        console.log(fields)
        console.log(files)

        let book = new Book(fields)

        if (files.image) {
            book.image.data = fs.readFileSync(files.image.path)
            book.image.contentType = files.image.type
        }

        try {
            let result = await book.save()
            return res.json(result)
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Unable to save book due to error: ${err}` })
        }
    })

}
/**
 * @desc    List all books in the database
 * @path    GET /api/books/all?keyword=${keyword}
 * @access  Public
 */

const getBooks = async (req, res) => {
    try {
        let { keyword } = req.query;

        const searchPhrase = keyword
            ? {
                title: {
                    $regex: keyword,
                    $options: "i"
                },
            }
            : {}

        let books = await Book.find({ ...searchPhrase }).populate(
            {
                path: 'reviews.userId', select: '_id name username'
            },
        ).populate('addedBy', '_id name username').select('-image').exec();
        console.log(books);
        return res.json(books)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: `Unable to fetch the books due to ${err}` })
    }
}

/**
 * @desc    Remove Book from the database
 * @path    DELETE /api/books/:bookId
 * @access  Private /Admin or /User(Creator)
 */

const removeBook = async (req, res) => {
    try {
        let book = req.book;
        let deletedBook = await book.remove()
        return res.json(deletedBook);
    } catch (err) {
        res.status(400).json({ message: `Unable to remove book due to ${err}` })
        // throw new Error(`Unable to remove the book due to ${err}`)
    }
}

/**
 * @desc    Update Book in the database
 * @path    PUT /api/books/update_book/:bookId
 * @access  Private /Admin or /User(Creator)
 */

const updateBook = async (req, res) => {
    let form = IncomingForm();
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return console.log(err)
        }

        let book = req.book;
        book = extend(book, fields)

        book.updated = Date.now()
        if (files.image) {
            book.image.data = fs.readFileSync(files.image.path)
            book.image.contentType = files.image.type
        }

        try {
            let result = await book.save()
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: `Unable to update book due to ${err}` })
        }
    })
}

/**
 * @desc    Fetch the book and append it to req so that it can be easily be retrieved
 */

const bookByID = async (req, res, next, id) => {
    try {
        let book = await Book.findById(id).populate('addedBy', '_id name username').exec()

        if (!book) {
            return res.status(404).json({
                message: `Book not found`
            })
        }

        req.book = book;
        next()
    } catch (err) {
        return res.status(400).json({ message: `Could not retrieve due to ${err}` })
    }
}

/**
 * @desc    Fetch a single book and return to client side
 * @path    GET /api/books/read/:bookId
 * @access  Public
 */

const read = async (req, res) => {
    let book = req.book;
    book.image = undefined;
    return res.json(book)
}

/**
* @desc    Fetch the image belonging to the book
* @path    GET /api/books/image/:bookId
* @access  Public
*/

const photo = async (req, res, next) => {
    let book = req.book;
    if (book.image.data) {
        res.set('Content-Type', book.image.contentType);
        return res.send(book.image.data)
    }
    next();
}

/**
 * @desc    Create a review of a book
 * @path    POST /api/books/create_review/:bookId
 * @access  Private /User
 */

const createReview = async (req, res) => {
    try {
        console.log(req.body)
        let { comment, userId } = req.body;

        let book = req.book;

        for (let i = 0; i < book.reviews.length; i++) {
            if (book.reviews[i].userId.equals(userId)) {
                return res.status(409).json({
                    message: 'Already reviewed'
                })
            }
        }

        const review = {
            userId: userId,
            comment: comment
        }

        book.reviews.push(review)

        let result = await book.save();
        console.log(result)
        return res.status(200).json(result)


    } catch (err) {
        return res.status(400).json({
            message: `Could add review due to ${err}`
        })
    }
}

const fetchComments = async (req, res) => {
    try {
        const book = req.book;
        let comments = book.reviews;
        return res.json(comments);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "An error was encountered due to" + err
        })
    }
}


export {
    createBook,
    getBooks,
    removeBook,
    updateBook,
    read,
    bookByID,
    photo,
    createReview,
    fetchComments
}
