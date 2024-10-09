import React, { useEffect, useState } from 'react'
import Select from 'react-select';

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  useEffect(()=> {
    const fetchReviews = async() => {
      try {
        const res = await fetch('/api/reviews/getAllReviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBooks = async() => {
      try {
        const res = await fetch('api/book/allbooks');
        const booksData = await res.json();
        setBooks(booksData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
    fetchBooks();
  },[]);

  const handleBookSelect = (selectedOption) => {
    setSelectedBook(selectedOption ? selectedOption.value : '');
  };

  const filteredReviews = selectedBook ? reviews.filter(review => review.bookId && review.bookId._id===selectedBook) : reviews;

  const bookOptions = books.map(book => ({
    value: book._id,
    label: book.bookname
  }));
  
  return (
      <div className="container mx-auto py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
          Manage Reviews
        </h2>
        <div className=" flex justify-center mt-8 mb-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <div className="flex justify-center items-center space-x-4 mt-2">
              {/* Display Reviewer's Avatar */}
              {review.avatar && (
                <img
                  src={review.avatar}
                  alt={`${review.username}'s avatar`}
                  className="rounded-full"
                  style={{ width: '3cm', height: '3cm' }} // Diameter: 1cm
                />
              )}

              {/* Display Book Image */}
              {review.bookId && review.bookId.bookImage && (
                <img
                  src={review.bookId.bookImage}
                  alt={`${review.bookId.bookname}`}
                  className="rounded-full"
                  style={{ width: '3cm', height: '3cm' }} // Diameter: 1cm
                />
              )}
            </div>
              <p className="text-lightBlue-500 font-semibold mt-2">
                User: {review.username}
              </p>
              <p className="text font-semibold text-slate-800">
                Book: {review.bookId ? review.bookId.bookname : 'No Book Name'}
              </p>
              <p className="text-slate-600 mt-2">{review.reviewText}</p>
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="mt-4 inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-800 transition duration-300"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      </div>
  );
}

export default ManageReviews
