import Review from "../models/review.model.js";

export const addReview = async(req,res,next) => {
    const {bookId, reviewText} = req.body;
    console.log('req.user:', req.user);
    try {
        if(!bookId || !reviewText) {
            res.status(400).json({message: "Book Id and review text are required fields"});
        }
        const review = new Review({
            bookId,
            userId: req.user.id,
            reviewText,
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.log(error);
    }
};