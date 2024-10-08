import express from 'express';
import { addBook, homeBooks, viewBook, fictionBooks, nonFictionBooks, sciFiBooks, getAllBooks, categoryFilter, deleteBook } from '../controllers/book.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
router.post('/addBook', addBook);
router.get('/homeBooks', homeBooks);
router.get('/viewBook/:id', viewBook);
router.get('/category/fiction', fictionBooks);
router.get('/category/non-fiction', nonFictionBooks);
router.get('/category/sci-fi', sciFiBooks);
router.get('/allBooks', getAllBooks);
router.get('/category/:category', categoryFilter);
router.get('/deleteBooks', getAllBooks);
router.delete('/deleteBook/:id',verifyToken, deleteBook);
export default router;