import { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SignIn() {

  const [formData , setFormdata] = useState({});
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);
  const handlechange = (e)=>{
      setFormdata({...formData , [e.target.id]:e.target.value });
  }
  
  const handlesubmit = async(e)=>{
    e.preventDefault();
    
    try {
      setLoading(true)
      setError(false)

      const  res = await fetch("/api/auth/signin", {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);  {msg : 'user created sucesfully'}
      if(data.success === false){
        setError(true)
        return;
      }

    } catch (error) {
      setLoading(false)
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>

        <input type="email" placeholder='email' id='email' className='p-3 rounded-lg'onChange={handlechange}/>

        <input type="password" placeholder='password' id='password'className='p-3 rounded-lg' onChange={handlechange}/>

        <button className='p-3 rounded-lg uppercase bg-slate-800 text-white hover:opacity-90 disabled:opacity-80' onClick={setLoading}> {loading? 'Loading...' : 'sign in'} </button>

      </form>
      <div className='flex gap-2 mt-4'>
        <p>Dont have an account?</p>
        <Link to='/signup'>
        <span className='text-blue-800'>Sign up</span>
        </Link>
      </div> 
      <p className='text-red-700 mt-5'>{error && 'something went  wrong!'}</p>
    </div>
  )
}
