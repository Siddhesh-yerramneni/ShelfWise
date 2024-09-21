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

export const viewBook = async(req,res,next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json('Book not found');
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

export const fictionBooks = async(req,res,next) => {
    try {
        const books = await Book.find({category: "Fiction"});
        if(books.length >0) {
            res.status(200).json(books);
        }
        else{
            res.status(404).json({message:'No books in this category yet'});
        }
    } catch (error) {
        next(error);
    }
};
