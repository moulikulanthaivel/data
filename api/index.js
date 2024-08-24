import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./route/userRoute.js";
import authRoute from "./route/authRoute.js";

dotenv.config({path:"./setting/.env"})

let port = process.env.PORT
let host = process.env.HOST
let mongo = process.env.MONGO


const app = express();

mongoose.connect(mongo)
.then(()=>{console.log('connected db')})
.catch((err)=>{console.log('not connected')})


app.listen(port, host,(err)=>{
    if(err) throw err
    console.log('server 3030');
});

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err , req, res, next)=>{
        const statusCode = err.statusCode || 500 ;
        const message = err.message || "internal server error";
        return res.status(statusCode).json({
            success:false,
            message,
            statusCode,
        });
});