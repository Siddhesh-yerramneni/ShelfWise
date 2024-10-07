import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function ViewBook() {
  const {currentUser} = useSelector(state=>state.user);
    const {id} = useParams();
    const [book,setBook] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);  // Track any errors
    const [successMessage, setSuccessMessage] = useState('');
    const [visibleReviews, setVisibleReviews] = useState(4);
    const [editReviewId, setEditReviewId] = useState(null);
    const [editedReview, setEditedReview] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
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

    useEffect(()=> {
      const fetchReviews = async() => {
        try {
          const res = await fetch(`/api/reviews/showReviews/${id}`);
          const data = await res.json();
          setReviews(data);
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };
      fetchReviews();
    },[id]);

    const handleViewMore = () => {
      setVisibleReviews((prevVisible) => prevVisible + 4); // Show 4 more reviews
    };

    const handleDeleteReview = async(reviewId) => {
      setError(null);
      try {
        const res = await fetch(`/api/reviews/deleteReview/${reviewId}`, {
          method: 'DELETE',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setDeleteMessage('Succesfully deleted');
      } catch (error) {
        console.log(error);
      }
    };

    const handleReviewSubmit = async (e) => {
      e.preventDefault();
      setError(null);  // Reset the error before making the request
      try {
        const res = await fetch('/api/reviews/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            bookId: id,
            reviewText: review,
            username: currentUser.username,
            avatar: currentUser.avatar,
          }),
        });
  
        if (res.ok) {
          const newReview = await res.json(); // Update reviews state
          setReview('');
          setSuccessMessage('Review posted succesfully!');
          setShowReviewForm(false);
        } else {
          const data = await res.json();
          setError(data.message);  // Set error message if review fails
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
        setError('Failed to submit the review. Please try again.');  // Handle any catch block errors
      }
    };

    const handleEditedReview = async (reviewId) => {
      setError('null'); // Reset error correctly
      try {
        const res = await fetch(`/api/reviews/edit/${reviewId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reviewText: editedReview }), // Pass the actual edited review text
        });
    
        if (res.ok) {
          const updatedReview = await res.json();
          // Optionally, update the local reviews state here
          setEditReviewId(null); // Close the edit form
          setEditedReview(''); // Clear the edited review state
          setSuccessMessage('Review updated successfully!');
          setReviews(
            reviews.map((rev) =>
              rev._id === reviewId ? { ...rev, reviewText: updatedReview.reviewText } : rev
            ));
          setTimeout(() => {
            window.location.reload(); // Reload to reflect changes (or better, update reviews state without reload)
          }, 500);
        } else {
          const data = await res.json();
          setError(data.message); // Set error if the response is not ok
        }
      } catch (error) {
        console.log(error);
        setError('Failed to update the review. Please try again.'); // Handle any catch block errors
      }
    };

    return (
        <div className="container mx-auto py-16">
        {successMessage && (
                <div className=" bg-rose-400 rounded-lg p-3 text-black text-center mb-4">
                  {successMessage}
                </div>
        )}
        {deleteMessage && (
              <div className=" bg-rose-400 rounded-lg p-3 text-black text-center mb-4">
                {deleteMessage}
              </div>
        )}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col sm:flex-row">
              {/* Book Image */}
              <div className="sm:w-1/4 mb-6 sm:mb-0">
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
                    <form onSubmit={handleReviewSubmit}>
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
            <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Reviews</h3>
      {reviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.slice(0, visibleReviews).map((rev) => (
              <div key={rev._id} className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={rev.avatar || "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg"} // Fallback avatar
                      alt={rev.username}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{rev.username}</h4>
                      <p className="text-gray-500 text-sm">{new Date(rev.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {currentUser && rev.userId.toString() === currentUser._id.toString() && (
                        <div className="space-x-4">
                          <button
                            className="hover:bg-zinc-600 transition duration-300 bg-rose-400 rounded p-2 text-center text-white"
                            onClick={() => handleDeleteReview(rev._id)}
                          >
                            Delete review
                          </button>
                          <button
                            className="hover:bg-zinc-600 transition duration-300 bg-rose-400 rounded p-2 text-center text-white"
                            onClick={() => {
                              if(editReviewId === rev._id){
                                setEditReviewId(null);
                                setEditedReview('');
                              } else {
                                setEditReviewId(rev._id);
                                setEditedReview(rev.reviewText);
                              }
                            }}
                          >
                            {editReviewId === rev._id ? 'Cancel Editing' : 'Edit Review'}
                          </button>
                        </div>
                      )}
                    </div>
                    {editReviewId === rev._id ? (
                      <div className="mt-4">
                        <textarea
                          value={editedReview}
                          onChange={(e) => setEditedReview(e.target.value)}
                          className="w-full h-32 p-4 border border-gray-300 rounded-md"
                        />
                        <button
                          className="mt-4 bg-rose-400 text-white font-semibold py-2 px-4 rounded hover:bg-zinc-600 transition duration-300"
                          onClick={()=>handleEditedReview(rev._id)}
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <p className="mt-4 text-gray-700">{rev.reviewText}</p>
                    )}
                  </div>
                ))}
          </div>

          {/* "View More" Button */}
          {visibleReviews < reviews.length && (
            <div className="flex justify-center mt-8">
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
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
