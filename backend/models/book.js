import mongoose from 'mongoose'


const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Book Title is required"],
        trim:true
    },
    author:{
        type:String,
        required:[true, "Author of the book is required"],
        trim:true
    },
    category:{
        type:String,
        required:[true, "Book category is required"],
        trim:true
    },
    description:{
        type: String,
        required:[true, "Book description is required"],
    },
    pages:{
        type:Number,
        required:[true, "Book pages is required"]
    },
    year:{
        type:Number,
        required:[true, "Year of release is required"]
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    image:{
        data: Buffer,
        contentType: String
    },
    created:{
        type:Date,
        default: Date.now
    },
    updated: Date,
    reviews: [
       {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            comment: String,
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Book = mongoose.model('Book', bookSchema);

export default Book;