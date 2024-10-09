import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('/api/book/allBooks');
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDeleteBook = async(bookId) => {
        try {
            const res = await fetch (`/api/book/deleteBook/${bookId}`, {
                method: 'DELETE',
            });
            setTimeout(() => {
                window.location.reload();
              }, 1000);
            setDeleteMessage('Book Deleted Succesfully');
        } catch (error) {
            //console.log(error);
            setDeleteMessage('Cannot delete the book!');
        }
    };

    const handleBookSelect = (selectedOption) => {
        setSelectedBook(selectedOption ? selectedOption.value : '');
      };

    const filteredBooks = selectedBook ? books.filter(book => book._id ===selectedBook) : books;

    const bookOptions = books.map(book => ({
        value: book._id,
        label: book.bookname
      }));

    return (
            <div className='container mx-auto py-16'>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
                    Manage the books !!
                </h2>
                <div className='flex justify-center mt-4'>
                <Select 
          options={bookOptions}
          value={bookOptions.find(option => option.value === selectedBook)}
          onChange={handleBookSelect}
          placeholder="Search for a book..."
          isClearable={true}
          isSearchable={true}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#f87180', // bg-rose-400
              borderColor: '#e5e7eb', // border color
              borderRadius: '0.375rem', // rounded-md
              padding: '0.25rem', // p-2
              height: '1cm',
              width: '10cm'
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#fff',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
            }),
            placeholder: (base) => ({
              ...base,
              color: 'black', // Change placeholder text color to black
            }),
          }}
        />
                </div>
                {deleteMessage && (
              <div className="mt-4 bg-rose-400 rounded-lg p-3 text-black text-center mb-4">
                {deleteMessage}
              </div>
        )}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
                    {filteredBooks.map((book) => (
                        <div key={book._id} className='bg-white shadow-lg rounded-lg p-6 text-center'>
                            <img src={book.bookImage} alt={book.bookname} className='w-50 h-50 object-cover rounded-lg mb-4'/>
                            <h3 className='text-xl font-semibold text-slate-800'>
                                {book.bookname}
                            </h3>
                            <p className="text-lightBlue-500 font-semibold mt-2">
                                Author: {book.author}
                            </p>
                            <p className="text-lightBlue-500 font-semibold mt-2">
                                Category: {book.category}
                            </p>
                            <Link
                                to={`/viewBook/${book._id}`}
                                className="mt-4 inline-block bg-rose-400 text-black font-semibold py-2 px-4 rounded hover:bg-lightBlue-600 transition duration-300"
                            >
                                View Details
                            </Link>
                            <button
                                onClick={()=>handleDeleteBook(book._id)}
                                className=" ml-2 mt-4 inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
    );
}