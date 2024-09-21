import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

export default function ViewBook() {
    const {id} = useParams();
    const [book,setBook] = useState('');

    useEffect(()=> {
        const fetchBookDetails = async() => {
            try {
                const res = await fetch (`/api/book/viewBook/${id}`);
                const data = await res.json();
                setBook(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookDetails();
    },[id]);

    console.log(book);

    return (
        <div className="container mx-auto py-16">
          <div style={{ marginTop: '60px'}} className="bg-white shadow-lg rounded-lg p-8">
            <img src={book.bookImage} className="w-50 h-50 object-cover rounded-lg mb-4" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{book.bookname}</h2>
            <p className="text-xl text-slate-600 mb-4">By: {book.author}</p>
            <p className="text-lg text-lightBlue-500 font-semibold mb-4">Price: ${book.price}</p>
            {/* Add more fields as needed */}
            <Link to="/" className="mt-4 inline-block bg-lightBlue-500 text-black font-semibold py-2 px-4 rounded hover:bg-lightBlue-600 transition duration-300">
              Back to Home
            </Link>
          </div>
        </div>
      );
}
