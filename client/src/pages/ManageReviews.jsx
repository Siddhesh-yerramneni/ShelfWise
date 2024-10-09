import React, { useEffect, useState } from 'react'

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
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
    fetchReviews();
  },[]);
  return (
      <div className="container mx-auto py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
          Manage Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-slate-800">
                {review.bookTitle}
              </h3>
              <img src={review.avatar} className='rounded-full mx-auto'/>
              <p className="text-lightBlue-500 font-semibold mt-2">
                By: {review.username}
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
