import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent , setImagePercent] = useState(0);


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;  // Create a unique file name
    const storageRef = ref(storage, fileName);           // Use fileName correctly
    const uploadTask = uploadBytesResumable(storageRef, image);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error('Upload failed:', error);           // Log errors during upload
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])}  // Fix: Access the first file
        />
        <img 
          src={currentUser.profilePicture} 
          alt="profile picture" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover" 
          onClick={() => fileRef.current.click()} 
        />
        <input 
          defaultValue={currentUser.username} 
          type="text"  
          id="username" 
          placeholder="username" 
          className="rounded-lg bg-slate-100 p-3 mt-2"  
        />
        <input 
          defaultValue={currentUser.email} 
          type="email" 
          id="email" 
          placeholder="email" 
          className="rounded-lg bg-slate-100 p-3 mt-2"  
        />
        <input 
          type="text"  
          id="password" 
          placeholder="password" 
          className="rounded-lg bg-slate-100 p-3 mt-2"  
        />
        <button 
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" 
        >update</button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
