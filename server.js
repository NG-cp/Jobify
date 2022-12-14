import express from "express";
const app = express();

import dotenv from "dotenv"
dotenv.config();

import 'express-async-errors';
import morgan from 'morgan';

import connectDB from "./database/connect.js";

import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRouter.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to Jobify");
});
app.get('/api/v1/',(req,res)=>{
    res.send("API");
});

app.use('/api/v1/auth/',authRouter);
app.use('/api/v1/jobs/',jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        });
    }
    catch (error) {
        console.log(error);
    }
}

start();