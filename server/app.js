import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import {errorMiddleware} from './middlewares/errorMiddlewares.js';
import authRouter from './routes/authRouter.js';
import bookRouter from './routes/bookRouter.js';
import borrowRouter from './routes/borrowRouter.js';
import expressFileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import { notifyUsers } from './services/notifyUsers.js';
import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';




export const app = express();

config({ path: './config/config.env' });

app.use(cors({
  origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware and routes can be added here
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//jo frontend se data aayega usko ye apne format mei convert krdega but ye sirf text pe kaam krta hai
app.use(expressFileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));



app.use("/api/v1/auth", authRouter);//api/v1/auth"-ye static uri hai
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);
// app.use("/", viewsRouter);
notifyUsers();
removeUnverifiedAccounts();
connectDB();

// app.set('view engine', 'ejs');
// app.set('views', 'views');
// app.set('layout', 'layout');
app.use(errorMiddleware)


