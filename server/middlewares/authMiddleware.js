import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Not authenticated", 401));
    }
    //user ke token ko decode kraya
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
});


// ye function check krta hai ki user ka role kya hai
export const isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }    
}
