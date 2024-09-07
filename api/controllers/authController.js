import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errHandler } from "../ulitis/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async(req ,res , next)=>{
    const {email , password} = req.body;
    
    try {
        const validUser = await User.findOne({email});
            if(!validUser) return next(errHandler(404 , "user not found"));
        const  validPassword = bcryptjs.compareSync(password , validUser.password);
            if(!validPassword) return next(errHandler(401 , 'wrong credentials'));

             const token =  jwt.sign({id:validUser._id}, process.env.JWT_SECRET);

        const {password: hashedPassword , ...rest} = validUser._doc;

        const expireDate = new Date(Date.now() + 3600000) //1hour
    res.cookie("access_token" , token , {httpOnly : true , expires : expireDate}).status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const google = async(req , res ,next)=>{
    try {
        const user = await User.findOne({email : req.body.email})
        if(user){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
        }else{

        }
    } catch (error) {
        next(error);
    }
}