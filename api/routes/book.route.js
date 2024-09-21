import express from 'express';
import { addBook, homeBooks, viewBook, fictionBooks } from '../controllers/book.controller.js';

const router = express.Router();
router.post('/addBook', addBook);
router.get('/homeBooks', homeBooks);
router.get('/viewBook/:id', viewBook);
router.get('/category/fiction', fictionBooks);
export default router;