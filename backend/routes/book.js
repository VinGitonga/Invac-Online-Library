import express from 'express'
import {
    createBook,
    updateBook,
    bookByID,
    read,
    getBooks,
    removeBook,
    photo,
    createReview,
    fetchComments
} from '../controllers/book.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/create')
    .post(protect, createBook)

router.route('/update_book/:bookId')
    .put(protect, updateBook)

router.route('/read/:bookId')
    .get(read)

router.route('/all')
    .get(getBooks)

router.route('/:bookId')
    .delete(protect, removeBook)

router.route('/image/:bookId')
    .get(photo)

router.route('/comments/:bookId')
    .get(fetchComments)

router.route('/create_review/:bookId')
    .post(protect, createReview)

router.param('bookId', bookByID)

export default router;