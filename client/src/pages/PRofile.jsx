import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase.js';
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(file);
  console.log(formData);

  useEffect(()=> {
    if(file){
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(progress);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="min-h-screen bg-zinc-200 flex items-center justify-center py-5"> {/* Background container */}
      <div className="p-6 max-w-lg w-full bg-rose-400 rounded-lg shadow-lg"> {/* Form container */}
        <h1 className="text-3xl font-semibold text-center text-black mb-4">Profile</h1>
        <form className="flex flex-col gap-4">
          <input type="file" ref={fileRef} hidden accept='image/*'
          onChange={(e)=>setFile(e.target.files[0])}/>
          <img
            src={ formData.avatar || currentUser.avatar}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
            onClick={()=> fileRef.current.click()}
          />
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="E-mail"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="*******"
            className="border p-3 rounded-lg"
          />
          <button className="rounded-lg border p-3 bg-white hover:bg-gray-200 transition" type="button">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5 text-white">
          <span className="cursor-pointer hover:underline">Delete account</span>
          <span className="cursor-pointer hover:underline">Sign out</span>
        </div>
      </div>
    </div>
  );
}
