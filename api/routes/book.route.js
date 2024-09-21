import express from 'express';
import { addBook, homeBooks, viewBook, fictionBooks, nonFictionBooks, sciFiBooks, getAllBooks } from '../controllers/book.controller.js';

const router = express.Router();
router.post('/addBook', addBook);
router.get('/homeBooks', homeBooks);
router.get('/viewBook/:id', viewBook);
router.get('/category/fiction', fictionBooks);
router.get('/category/non-fiction', nonFictionBooks);
router.get('/category/sci-fi', sciFiBooks);
router.get('/allBooks', getAllBooks);
export default router;