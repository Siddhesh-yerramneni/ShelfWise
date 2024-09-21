import React, { useState, useEffect, setTimeout } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase.js';
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, logOutUserFailure, logOutUserStart, logOutUserSuccess } from '../redux/User/userSlice'; // Assuming this updates the user in Redux
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // For success alert
  const [errorMessage, setErrorMessage] = useState(''); // For error alert
  const [deleteMessage, setDeleteMessage] = useState(''); // For delete alert

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
        console.log(progress);
      },
      (error) => {
        setFileUploadError('Failed to upload the image.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadURL,
          }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(updateFailure(data.message));
        setErrorMessage('Failed to update profile.'); // Set error message
        return;
      }

      // Update Redux state with the updated user data
      dispatch(updateSuccess(data)); // Dispatch the action to update the user in the Redux store
      setSuccessMessage('Profile updated successfully!'); // Set success message
      setErrorMessage(''); // Clear any previous error message
      console.log('Update successful:', data.message);

    } catch (error) {
      dispatch(updateFailure(error.message));
      setErrorMessage('An error occurred during the update.'); // Set error message
      setSuccessMessage(''); // Clear success message
      console.error('Error during update:', error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(deleteUserFailure(data.message));
        setErrorMessage('Failed to delete user.'); // Set error message
        return;
      }

      dispatch(deleteUserSuccess()); // Clear currentUser from Redux store
      setDeleteMessage('User deleted successfully!'); // Set delete success message
      setErrorMessage(''); // Clear any previous error message
      console.log('User deleted successfully');

      // Redirect after a short delay (if needed)
      window.setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirects after 2 seconds
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setErrorMessage('An error occurred during user deletion.'); // Set error message
      setDeleteMessage(''); // Clear delete message
      console.error('Error during deletion:', error);
    }
  };

  const handleLogOut = async() => {
    try {
      dispatch(logOutUserStart());
      const res = await fetch(`/api/auth/logout`);
      const data = res.json();
      if(data.success===false) {
        dispatch(logOutUserFailure(data.message));
        return;
      }
      dispatch(logOutUserSuccess(data));
    } catch (error) {
      dispatch(logOutUserFailure(data.message));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex items-center justify-center py-5">
      {/* Background container */}
      <div className="p-6 max-w-lg w-full bg-rose-400 rounded-lg shadow-lg">
        {/* Form container */}
        <h1 className="text-3xl font-semibold text-center text-black mb-4">Profile</h1>

        {/* Success, Error, or Delete Alerts */}
        {successMessage && (
          <div className="text-black text-center mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-black text-center mb-4">
            {errorMessage}
          </div>
        )}
        {deleteMessage && (
          <div className="text-black text-center mb-4">
            {deleteMessage}
          </div>
        )}
        {fileUploadError && (
          <div className="text-black text-center mb-4">
            {fileUploadError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            className="rounded-lg border p-3 bg-white hover:bg-gray-200 transition"
            type="submit"
          >
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5 text-white">
          <span className="cursor-pointer hover:underline" onClick={handleDelete}>Delete account</span>
          <span className="cursor-pointer hover:underline" onClick={handleLogOut} >Sign out</span>
        </div>
      </div>
    </div>
  );
}
