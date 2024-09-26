import mongoose from "mongoose";
import Book from './book.model.js';
import User from './user.model.js';
const reviewSchema = new mongoose.Schema({
    bookId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {timestamps: true}
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;