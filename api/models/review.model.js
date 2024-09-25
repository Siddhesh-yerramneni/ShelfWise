import mongoose from "mongoose";
import Book from './book.model';
import User from './user.model';
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
    username: {
        type: String,
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