import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';

export default function SignUp() {

  const [formData , setFormdata] = useState({});
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e)=>{
      setFormdata({...formData , [e.target.id]:e.target.value });
  }
  
  const handlesubmit = async(e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      setError(false)

      const  res = await fetch("/api/auth/signup", {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setError(true)
        return;
      }
      navigate("/signin")
    } catch (error) {
      setLoading(false)
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
        <input type="text" placeholder='username' id='username' className='p-3 rounded-lg' onChange={handlechange}/>
        <input type="email" placeholder='email' id='email' className='p-3 rounded-lg'onChange={handlechange}/>
        <input type="password" placeholder='password' id='password'className='p-3 rounded-lg' onChange={handlechange}/>
        <button disabled={loading} className='p-3 rounded-lg uppercase bg-slate-800 text-white hover:opacity-90 disabled:opacity-80'> {loading? 'Loading...' : 'signup'} </button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-800'>Log In</span>
        </Link>
      </div> 
      <p className='text-red-700 mt-5'>{error && 'something went  wrong!'}</p>
    </div>
  )
}
