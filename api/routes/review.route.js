import express from 'express';
const router = express.Router();
import {verifyToken}  from '../utils/verifyUser.js';
import {addReview} from '../controllers/review.controller.js';
router.post('/addReview',verifyToken, addReview);
export default router;