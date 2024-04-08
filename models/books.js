import mongoose from "mongoose";


const reviewschema=mongoose.Schema({

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    comment: {
        type: String,
        required: true
    }

}, { timestamps: true });
const bookSchema=new mongoose.Schema({
    ISBN:{
        type:String,
        required: true,
        unique: true,

    },
    author:{
        type:String,
        required: true,
        unique: true,

    },
    title:{
        type: String,
        required: true,
    },
    reviews: [reviewschema]

},{timestamps:true});
const books=mongoose.model("books",bookSchema);
export default books
