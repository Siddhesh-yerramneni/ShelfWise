import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase.js'; // Make sure this path is correct
import { Navigate } from 'react-router-dom';

export default function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    bookname: '',
    author: '',
    price: '',
    category: '',
    description: '',
    bookImage: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [fileUploadError, setFileUploadError] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`/api/book/viewBook/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch book details');
      }
    };
    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setFileUploadError('Failed to upload the image.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setBook((prevBook) => ({
            ...prevBook,
            bookImage: downloadURL,
          }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/book/updateBook/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await res.json();
      console.log('API Response:', data); // Debugging
      if (data.success) {
        setSuccessMessage('Book updated successfully');
        setTimeout(() => {
            navigate('/manageBooks');
          }, 2000);
       
      } else {
        setError(data.message || 'Failed to update book');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while updating the book');
    }
  };
  

  return (
    <div className="container mx-auto py-16">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {fileUploadError && <p className="text-red-500 mb-4">{fileUploadError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row">
            {/* Book Image */}
            <div className="sm:w-1/4 mb-6 sm:mb-0">
              <img
                src={book.bookImage}
                alt={book.bookname}
                className="w-50 h-50 object-cover rounded-lg cursor-pointer"
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Book Details */}
            <div className="sm:w-2/3 sm:pl-8">
              <span className='text-black font-semibold ml-2'>Book Name :</span>
              <input
                type="text"
                name="bookname"
                value={book.bookname}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-2xl font-bold"
              />
              <span className='text-black font-semibold ml-2'>Author :</span>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <span className='text-black font-semibold ml-2'>Price :</span>
              <input
                type="number"
                name="price"
                value={book.price}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <span className='text-black font-semibold ml-2'>Category :</span>
              {/* Category Field */}
              <div className="mb-6">
                <select
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    required
                >
                    <option disabled value="">Select...</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-fiction</option>
                    <option value="Sci-fi">Sci-fi</option>
                </select>
              </div>
              <span className='text-black font-semibold ml-2'>Description :</span>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                rows="6"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}