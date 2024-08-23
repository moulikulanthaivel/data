import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errHandler } from "../ulitis/error.js";

export  const signup = async(req,res, next)=>{
    const {username , email  , password} = req.body;
    const  hashedPassword = bcryptjs.hashSync(password , 10)
    const newUser = new User({username , email , password:hashedPassword})

    try {
        await newUser.save()
        res.status(201).json({msg : "user created successfully"})
    } catch (error) {
        next(errHandler(300 , "user creditentials"))
    }


}