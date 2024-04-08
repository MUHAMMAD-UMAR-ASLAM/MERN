import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "../routes/auth.route.js";
import bodyParser from 'body-parser';
import booksRouter from '../routes/books.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });
const app=express();
app.listen(3000, () => {
    console.log("Server is running 3000!!!")
})
app.use(bodyParser.json());
app.use("/api/user",authRouter)
app.use("/api/books",booksRouter)
app.use((err,req,res,next)=>{
 const statusCode=err.statusCode || 200;
 const message=err.message;
 return res.status(statusCode).json({
  success:false,
  statusCode,
  message
 });


})