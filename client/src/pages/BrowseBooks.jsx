import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function BrowseBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Fiction', 'Non-fiction', "Sci-fi"];
    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                const url = selectedCategory==='All'
                ? '/api/book/allBooks'
                : `/api/book/category/${selectedCategory}`;

                const res = await fetch(url);
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooksByCategory();
    }, [selectedCategory]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="py-16 bg-lightBlue-50">
            <div className='container mx-auto'>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
                    Find your read now !
                </h2>
                <div className='flex justify-center mt-4'>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 mx-2 rounded ${selectedCategory === category ? 'bg-rose-400 text-white' : 'bg-zinc-200'}`}
                        onClick={() => setSelectedCategory(category)} >
                        {category}
                    </button>
                ))}
                </div>
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
                            <p className="text-lightBlue-500 font-semibold mt-2">
                                Author: {book.category}
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