import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function NonFiction() {
    const [books, setBooks] = useState([]);
    useEffect(()=> {
        const fetchBooks = async() => {
            try {
                const res = await fetch('/api/book/category/non-fiction');
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    },[]);
  return (
    <section className="py-16 bg-lightBlue-50">
            <div className='container mx-auto'>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
                    Non-fiction books
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
                    {books.map((book) => (
                        <div key={book._id} className='bg-white shadow-lg rounded-lg p-6 text-center'>
                            <img src={book.bookImage} alt={book.bookname} className='w-50 h-50 object-cover rounded-lg mb-4'/>
                            <h3 className='text-xl font-semibold text-slate-800'>
                                {book.bookname}
                            </h3>
                            <p className="text-lightBlue-500 font-semibold mt-2">
                                Author: {book.author}
                            </p>
                            <Link
                                to={`/viewBook/${book._id}`}
                                className="mt-4 inline-block bg-lightBlue-500 text-black font-semibold py-2 px-4 rounded hover:bg-lightBlue-600 transition duration-300"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
  );
}
