import express from "express";
import { userController } from "../controllers/userController.js";

const userRoute = express.Router();
userRoute.get('/',userController)
export default userRoute