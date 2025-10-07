import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register=catchAsyncErrors(async(req,res,next)=>{
    try{
        const {name, email, password}=req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("Please enter all fields", 400));
        }
        const isRegistered=await User.findOne({email,accountVerified:true});
        if(isRegistered){
            return next(new ErrorHandler("User already registered", 400));
        }
        const registerationAttemptsByUser=await User.find({email,accountVerified:false});
        if(registerationAttemptsByUser.length>=3){
            return next(new ErrorHandler("You have exceeded the maximum number of registration attempts. Please try again later.", 400));
        }
        if(password.length<6||password.length>20){
            return next(new ErrorHandler("Password must be between 6 and 20 characters", 400));
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name, email, password:hashedPassword});
        const verificationCode=await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode,email,res);
       
       
    }catch(error){
        next(error);

    }
})

export const verifyOTP=catchAsyncErrors(async(req,res,next)=>{
    const {email,otp}=req.body;
    if(!email || !otp){
        return next(new ErrorHandler("Please enter all fields",400));
    }
    try{
        const userAllEntries=await User.find({
            email,
            accountVerified:false,
        }).sort({createdAt:-1});
        if(userAllEntries.length===0){
            return next(new ErrorHandler("User not found",404));
        }
        // agar ek se jyada entry hui to latest rkhni hai baaki saari delete krni hai 

        let user;
        if(userAllEntries.length>1){
            user=userAllEntries[0];
            await User.deleteMany({
                email,
                accountVerified:false,
                _id:{$ne:user._id},
            });
        }else{
            user=userAllEntries[0];
        }
        if(user.verificationCode!==Number(otp)){
            return next(new ErrorHandler("Invalid OTP",400));
        }
        const currentTime=Date.now();
        const verificationCodeExpire=new Date(user.verificationCodeExpire).getTime();
        if(currentTime>verificationCodeExpire){
            return next(new ErrorHandler("OTP expired",400));
        }
        user.accountVerified=true;
        user.verificationCode=null;
        user.verificationCodeExpire=null;
        await user.save({validateModifiedOnly:true});

        sendToken(user,200,"Account Verified Successfully",res);

        
    }catch(error){
        return next(new ErrorHandler("Invalid Server Error",500));
    }
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
        const user = await User.findOne({ email, accountVerified: true }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        sendToken(user, 200, "Login Successful", res);
    
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.json({
        success: true,
        message: "Logged out successfully"
    });
})

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
})

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    if(!req.body.email){
        return next(new ErrorHandler("Please enter your email",400));
    }
    const user= await User.findOne({email:req.body.email,accountVerified:true});
    if(!user){
        return next(new ErrorHandler("Invalid Email",404));
    }
    const resetToken=user.getResetPasswordToken();
    await user.save({
        validateBeforeSave:false
    });
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset/password/${resetToken}`;
    const message=generateForgotPasswordEmailTemplate(resetPasswordUrl);

    try{
        await sendEmail({email:user.email,subject:" LibraTrack Library Management System Password Recovery",message});
        res.status(200).json({
            success:true,message:`Email sent to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }
})

export const resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.params;
    const resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");
    const user=await User.findOne({resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Invalid or expired password reset token",400));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm password do not match",400));
    }
    if(req.body.password.length<6 || req.body.password.length>20 || req.body.confirmPassword.length<6 || req.body.confirmPassword.length>20){
        return next(new ErrorHandler("Password must be between 6 to 20 characters",400));
    }
    const hashedPassword=await bcrypt.hash(req.body.password,10);
    user.password=hashedPassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,"Password reset successful",res);
})

export const updatePassword =catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user._id).select("+password");
    const{currentPassword,newPassword,confirmNewPassword}=req.body;
    if(!currentPassword || !newPassword || !confirmNewPassword){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const isPasswordMatched=await bcrypt.compare(currentPassword,user.password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Current password is incorrect", 400));
    }
    if(newPassword.length<6 || newPassword.length>20 || confirmNewPassword.length<6 || confirmNewPassword.length>20){
        return next(new ErrorHandler("Password must be between 6 to 20 characters", 400));
    }
    if(newPassword!==confirmNewPassword){
        return next(new ErrorHandler("New password and confirm new password do not match", 400));
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });
})
    