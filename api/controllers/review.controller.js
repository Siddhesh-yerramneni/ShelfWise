import Review from "../models/review.model.js";

export const addReview = async(req,res,next) => {
    const {bookId, reviewText, username, avatar} = req.body;
    try {
        if(!bookId || !reviewText) {
            res.status(400).json({message: "Book Id and review text are required fields"});
        }
        const review = new Review({
            bookId,
            userId: req.user.id,
            reviewText,
            username,
            avatar,
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.log(error);
    }
};