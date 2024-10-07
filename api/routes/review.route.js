import express from 'express';
const router = express.Router();
import {verifyToken}  from '../utils/verifyUser.js';
import {addReview, getAllReviews, deleteReview, editReview} from '../controllers/review.controller.js';
router.post('/addReview',verifyToken, addReview);
router.get('/showReviews/:id', getAllReviews);
router.delete('/deleteReview/:id',verifyToken, deleteReview);
router.post('/edit/:id', editReview);
export default router;