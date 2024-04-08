import { errorHandler } from "../api/utils/errorHandler.js";
import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import  Jwt  from "jsonwebtoken";
import bodyParser from 'body-parser';
export const signup=async(req,res,next)=>{
try{
    
    const {username,email,password}=req.body

    const hashPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:hashPassword});
     await newUser.save();
     res.status(200).json("user created succesfully");
    }
    catch(error)
    {
       next(error)
    }

}
export const signIn=async(req,res,next)=>{
    try{
    const {email,password}=req.body
    const validUser= await User.findOne({email});
    if(!validUser) return next(errorHandler('401','User not Found!'))
   


    const validPassowrd=bcryptjs.compareSync(password,validUser.password);
    if(!validPassowrd) return next(errorHandler('401',"Invalid Credentials"))
    const token=Jwt.sign({id:validUser._id},process.env.secret_key);
    res.cookie("access_token",token,{httpOnly:true}).status(200).json(validUser);
    }catch(error)
    {
       
    next(error)
    }

    
}