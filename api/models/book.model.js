import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        bookname: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bookImage: {
            type: String,
            default: "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg",
        },
        category: {
            type: String,
            required: true,
        },
    },{timestamps: true}
);

const Book = mongoose.model('Book', bookSchema);
export default Book;