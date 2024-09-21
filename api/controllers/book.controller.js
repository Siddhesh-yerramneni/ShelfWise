import Book from "../models/book.model.js";
export const addBook = async(req,res,next) => {
    const {bookname, author, description, price, bookImage, category} = req.body;
    const newBook = new Book({
        bookname,
        author,
        description,
        price,
        bookImage,
        category
    });
    try {
        await newBook.save();
        res.status(200).json('Book added');
    } catch (error) {
        next(error);
    }
};

export const homeBooks = async(req,res) => {
    try {
        const books = await Book.find().limit(4);
        res.json(books);
    } catch (error) {
        next(error);
    }
};
