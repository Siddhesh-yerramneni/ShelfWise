import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase.js';

export default function AddBooks() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('File upload error:', error);
        setFileUploadError('Failed to upload the image.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            bookImage: downloadURL,
          }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate that the image has been uploaded
    if (!formData.bookImage) {
      setFileUploadError('Please upload a cover image before submitting.');
      return;
    }

    try {
      const res = await fetch('/api/book/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setErrorMessage(data.message || 'Failed to add the book.');
        return;
      }

      setSuccessMessage('Book added successfully.');
      setErrorMessage('');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to add the book.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-200">
      <div style={{ marginTop: '60px' }} className="bg-rose-400 p-8 rounded-lg shadow-md w-2/5">
        <h2 className="text-2xl font-bold text-center text-lightBlue-700 mb-6">Add a Book</h2>
        {/* Display File Upload Error */}
        {fileUploadError && (
          <div className="text-red-500 text-center mb-4">
            {fileUploadError}
          </div>
        )}
        {/* Display Success and Error Messages */}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Book Name */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">Title</label>
            <input
              type="text"
              id="bookname"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              placeholder="Enter the book's name"
              onChange={handleChange}
            />
          </div>

          {/* Author Field */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">Author</label>
            <input
              type="text"
              id="author"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              placeholder="Enter author's name"
              onChange={handleChange}
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">Description</label>
            <input
              type="text"
              id="description"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              placeholder="Enter description"
              onChange={handleChange}
            />
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              id="price"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              placeholder="Enter price"
              onChange={handleChange}
            />
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">Category:</label>
            <select
              name="category"
              onChange={handleChange}
              id="category"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              required
            >
              <option disabled value="">Select...</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Sci-fi">Sci-fi</option>
            </select>
          </div>

          {/* Book Cover Field */}
          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">Cover Image:</label>
            <input
              type="file"
              id="bookImage"
              ref={fileRef}
              accept="image/*"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition duration-300 border"
          >
            Add Book
          </button>
        </form>

        
      </div>
    </div>
  );
}
