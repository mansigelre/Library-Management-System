import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "LibraryManagement",
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.error("Database connection error:", error);
    });
}
