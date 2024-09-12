import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user) 
  return (
    <div className="max-w-lg mx-auto">
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className="flex flex-col gap-4">
        <img src={currentUser.profilePicture} alt="picture"className="h-24 w-24 self-center cursor-pointer rounded-full object-cover" />
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
