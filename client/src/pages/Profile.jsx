import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user) 
  const fileRef = useRef(null);
  const [image , setImage] = useState(undefined);

 useEffect(()=>{
  if(image){
    handleFileUpload(image);
  }
 })

 const handleFileUpload= async(image)=>{
  const storage = getStorage(app);
  const fileName = new Date().getTime + image.name;
  const storageRef = ref(storage , fileName);
  const uploadTask = uploadBytesResumable(storageRef , image)
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
      const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is' + progess + '% done')
    }
  )
 }
  return (
    <div className="max-w-lg mx-auto">
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className="flex flex-col gap-4">
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>{setImage(e.target.files)}} />
        <img src={currentUser.profilePicture} alt="picture"className="h-24 w-24 self-center cursor-pointer rounded-full object-cover" onClick={()=>{fileRef.current.click()}} />
      <input defaultValue={currentUser.username} type="text"  id="username" placeholder="username" className=" rounded-lg bg-slate-100 p-3 mt-2"  />
      <input defaultValue={currentUser.email} type="email" id="email" placeholder="email" className=" rounded-lg bg-slate-100 p-3 mt-2"  />
      <input type="text"  id="password" placeholder="password" className=" rounded-lg bg-slate-100 p-3 mt-2"  />
      <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" >update</button>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </form>
    </div>
  )
}
