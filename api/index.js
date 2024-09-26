import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import reviewRoutes from './routes/review.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("DB is connected!")
})
.catch(err=>{
    console.log(err)
});
const app = express();

app.use(cookieParser());

app.use(express.json());

app.listen(6191, ()=> {
    console.log("Server is running on port 6191");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})