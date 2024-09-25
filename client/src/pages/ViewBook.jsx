import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function ViewBook() {
  const {currentUser} = useSelector(state=>state.user);
    const {id} = useParams();
    const [book,setBook] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [review, setReview] = useState('');
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

    //console.log(book);

    return (
        <div className="container mx-auto py-16">
          <div style={{ marginTop: '60px' }} className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col sm:flex-row">
              {/* Book Image */}
              <div className="sm:w-1/3 mb-6 sm:mb-0">
                <img
                  src={book.bookImage}
                  alt={book.bookname}
                  className="w-50 h-50 object-cover rounded-lg"
                />
              </div>
    
              {/* Book Details */}
              <div className="sm:w-2/3 sm:pl-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{book.bookname}</h2>
                <p className="text-xl text-slate-600 mb-2">By: {book.author}</p>
                <p className="text-lg text-lightBlue-500 font-semibold mb-4">
                  Price: ${book.price}
                </p>
                <p className="text-lg text-gray-800 mb-4">
                  <span className="font-semibold">Category:</span> {book.category}
                </p>
                <p className="text-md text-gray-700 mb-6">
                  <span className="font-semibold">Description:</span> {book.description}
                </p>
                {currentUser && (
                  <button
                    className="bg-rose-400 text-white p-3 rounded hover:bg-zinc-600 transition duration-300"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? "Cancel Review" : "Write a review"}
                  </button>
                )}
                {currentUser && <button className='bg-rose-400 text-white p-3 rounded ml-3 hover:bg-zinc-600 transition duration-300'>
                  Contact author
                </button> }
                {showReviewForm && (
                  <div className="bg-white shadow-lg rounded-lg p-8 mt-6">
                    <form>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-md"
                        required
                      />
                      <button
                        type="submit"
                        className="mt-4 bg-rose-400 text-white font-semibold py-2 px-4 rounded hover:bg-zinc-600 transition duration-300"
                      >Submit Review
                      </button>
                    </form>
                 </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Back to Home Button */}
          <Link
                  to="/"
                  className="mt-4 inline-block  text-black font-semibold py-3 px-6 rounded-full hover:underline "
                >
                  Back to Home
                </Link>
        </div>
      );
}
