import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [homeBooks, setHomeBooks] = useState([]);

  useEffect(()=>{
    const fetchHomeBooks = async() => {
      try {
        const res = await fetch('/api/book/homeBooks');
        const data = await res.json();
        setHomeBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomeBooks();
  }, []);

  return (
    <div className='shadow'>
      {/* Hero Section */}
      <section className="bg-zinc-200 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to ShelfWise
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-4">
            Discover your next great read today!
          </p>
          <Link to="/allBooks" className="mt-8 inline-block bg-lightBlue-500 text-black font-semibold py-3 px-8 rounded-full hover:bg-lightBlue-600 transition duration-300">
            Browse Books
          </Link>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-white">
        <div className="p-6 container bg-rose-400 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
            <span className='text-white'>Explore</span>
            <span className='mx-2'>Categories</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-slate-200 p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-black">Fiction</h3>
              <p className="text-black mt-4">Immerse yourself in stories that captivate and inspire.</p>
              <Link to="/category/fiction" className="text-lightBlue-500 hover:underline font-semibold mt-4 inline-block">
                Browse Fiction
              </Link>
            </div>
            <div className="bg-slate-200 p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-lightBlue-700">Non-Fiction</h3>
              <p className="text-black mt-4">Explore real-world topics and enrich your knowledge.</p>
              <Link to="/category/non-fiction" className="text-lightBlue-500 hover:underline font-semibold mt-4 inline-block">
                Browse Non-Fiction
              </Link>
            </div>
            <div className="bg-slate-200 p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-lightBlue-700">Science Fiction</h3>
              <p className="text-black mt-4">Discover futuristic worlds and advanced technologies.</p>
              <Link to="/category/sci-fi" className="text-lightBlue-500 hover:underline font-semibold mt-4 inline-block">
                Browse Sci-Fi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 bg-lightBlue-50">
        <div className='container mx-auto'>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
            Popular Books
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
          {homeBooks.length > 0 ? (
            homeBooks.map((book) => (
              <div key={book._id} className='bg-white shadow-lg rounded-lg p-6 text-center'>
                <img src= {book.bookImage} className='w-50 h-50 object-cover rounded-lg mb-4'/>
                <h3 className='text-xl font-semibold text-slate-800'>
                  {book.bookname}
                </h3>
                <p className="text-lightBlue-500 font-semibold mt-2">
                     Author : {book.author}
                </p>
                <Link
                    to={`/viewBook/${book._id}`} // Link to the book's detail page
                    className="mt-4 inline-block bg-lightBlue-500 text-black font-semibold py-2 px-4 rounded hover:bg-lightBlue-600 transition duration-300"
                  >
                    View Details
                </Link>
              </div>
            ))
          ):(
            <p>Loading!!!</p>
          )}
        </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Ready to start your reading journey?
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mt-4">
            Join our community of book lovers today!
          </p>
          <Link to="/signup" className="mt-8 inline-block bg-lightBlue-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-lightBlue-600 transition duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
