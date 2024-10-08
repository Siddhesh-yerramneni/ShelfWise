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

export const getAllReviews = async(req,res) => {
    try {
        const bookId = req.params.id;
        const reviews = await Review.find({bookId}).populate('username', 'avatar');
        if(!reviews) {
            return res.status(404).json('No reviews found');
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
    }
};

export const deleteReview = async(req,res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted the review");
        //console.log("Deleted")
    } catch (error) {
        console.log(error);
    }
};

export const editReview = async(req,res) => {
    try {
        const editedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json('Review is updated!');
    } catch (error) {
        console.log(error);
    }
};