import Book from "../models/book.model.js";
export const addBook = async (req, res, next) => {
    const { bookname, author, description, price, bookImage, category } = req.body;
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
        res.status(200).json({ success: true, message: 'Book added successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add the book.', error: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    bookImage: req.body.bookImage,
                    bookname: req.body.bookname,
                    author: req.body.author,
                    price: req.body.price,
                    category: req.body.category,
                    description: req.body.description,
                },
            },
            { new: true }
        );
        res.status(200).json({ success: true, message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



export const homeBooks = async(req,res,next) => {
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

export const nonFictionBooks = async(req,res,next) => {
    try {
        const books = await Book.find({category: "Non-fiction"});
        if(books.length>0) {
            res.status(200).json(books);
        }else{
            res.status(404).json("No book found");
        }
    } catch (error) {
        next(error);
    }
};

export const sciFiBooks = async(req,res,next) => {
    try {
        const books = await Book.find({category: "Sci-fi"});
        if(books.length>0) {
            res.status(200).json(books);
        }else{
            res.status(404).json("No book found");
        }
    } catch (error) {
        next(error);
    }
};

export const getAllBooks = async(req,res,next) => {
    try {
        const books = await Book.find();
        if(books.length >0){
            res.status(200).json(books);
        }
        else{
            res.status(404).json("No books in database");
        }
    } catch (error) {
        next(error)
    }
};

export const categoryFilter = async(req,res) => {
    const {category} = req.params;
    try {
        // Find books with the matching category
        const books = await Book.find({ category: category });
        
        if (books.length > 0) {
          res.status(200).json(books);
        } else {
          res.status(404).json({ message: 'No books found in this category' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
};

export const deleteBook = async(req,res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json('Book is deleted');
        console.log('Book is deleted');
    } catch (error) {
        console.log(error);
    }
};
