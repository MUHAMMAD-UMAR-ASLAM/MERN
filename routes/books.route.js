import express from "express";
// import { signIn, signup } from "../controllers/auth.controller.js";
import { storebooks,getAllBooks, get_books_by_isbn, get_books_by_author,get_books_by_title,add_review_to_book ,get_books_revies,update_review,delete_review} from "../controllers/book.controller.js";

const router=express.Router()

router.post('/storebooks',storebooks);
router.post("/getAllBooks",getAllBooks);
router.post("/getbooksbyisbn",get_books_by_isbn);
router.post("/getbooksbyauthor",get_books_by_author);
router.post("/getbooksbytitle",get_books_by_title);
router.post("/addreviewtobooks",add_review_to_book);
router.post("/getBookreview",get_books_revies)
router.post("/update_review",update_review)
router.post("/delete_review",delete_review)
export default router;
