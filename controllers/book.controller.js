
import Books from "../models/books.js";
import { errorHandler } from "../api/utils/errorHandler.js";
import books from "../models/books.js";


export const storebooks=async(req,res,next)=>{
    try{
        
        // res.status(200).json(req.body)
        const {ISBN,title,author}=req.body

        const books=new Books({ISBN,author,title})

        await books.save();
        res.status(200).json("Books store succesfully");
    }    
    catch(error){
        next(error)
    }




}

export const getAllBooks=async(req,res,next)=>{
    try{
       
        const books=await Books.find().lean();
        res.status(200).json(books)
    }
    catch(error){
        next(error)
    }
}

export const get_books_by_isbn=async(req,res,next)=>{
    try{
        const {ISBN}=req.body
        const books=await Books.find({ ISBN: ISBN }).lean();
        res.status(200).json(books)
    }
    catch(error){
        next(error)
    }

}
export const get_books_by_author=async(req,res,next)=>{
    try{
        const {author}=req.body
        const books=await Books.find({ author: author }).lean();
        res.status(200).json(books)
    }
    catch(error){
        next(error)
    }
}

export const get_books_by_title=async(req,res,next)=>{
    try{
        const {title}=req.body
        const books=await Books.find({ title: title }).lean();
        res.status(200).json(books)
    }
    catch(error){
        next(error)
    }
}

export const add_review_to_book=async(req,res,next)=>{
    try{
        const {comment,bookId,userId}=req.body
        const book = await Books.findById(bookId);
        if (book){
            book.reviews.push({comment:comment,userId:userId})
            await book.save()
            res.status(200).json(book)
            return book
        }
        else{
            return res.status(400).json("Book not found")
        }

    }
    catch(error)
    {
        next(error)
    }
}

export const get_books_revies=async(req,res,next)=>{

    try{
        const {comment,bookId,userId}=req.body
        const book = await Books.findById(bookId);
        if (book){
            
            res.status(200).json(book.reviews)
            return book
        }
        else{
            return res.status(400).json("Book not found")
        }

    }
    catch(error)
    {
        next(error)
    }

}

export const update_review = async (req, res, next) => {
    try {
        const { ISBN, userId, comment } = req.body;

        const updatedReviewData = {
            comment: comment,
            userId:userId
        };

        const book = await Books.findOne({ ISBN: ISBN }).populate('reviews');
        
        if (book) {

            const reviewIndex = book.reviews.findIndex(review => review.userId.equals(userId));

            if (reviewIndex !== -1) {
                book.reviews[reviewIndex].comment=comment
                await book.save();
                res.status(200).json("Review updated successfully");
            } else {
                res.status(404).json("Review not found");
            }
        } else {
            res.status(404).json("Book not found");
        }
    } catch (error) {
        next(error);
    }
};


export const delete_review = async (req, res, next) => {
    try {
        const { ISBN, userId } = req.body;

        const book = await Books.findOne({ ISBN: ISBN }).populate('reviews');
        
        if (book) {
            const reviewIndex = book.reviews.findIndex(review => review.userId.equals(userId));

            if (reviewIndex !== -1) {
                // Remove the review from the array
                book.reviews.splice(reviewIndex, 1);
                await book.save();
                res.status(200).json("Review deleted successfully");
            } else {
                res.status(404).json("Review not found");
            }
        } else {
            res.status(404).json("Book not found");
        }
    } catch (error) {
        next(error);
    }
};