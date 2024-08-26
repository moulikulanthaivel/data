import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure({ message: data.message || 'Sign-in failed' }));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure({ message: 'Network error' }));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder='Email'
          id='email'
          className='p-3 rounded-lg'
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          className='p-3 rounded-lg'
          onChange={handlechange}
        />
        <button
          disabled={loading}
          className='p-3 rounded-lg uppercase bg-slate-800 text-white hover:opacity-90 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex gap-2 mt-4'>
        <p>Don't have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-800'>Sign up</span>
        </Link>
      </div>

      {error && <p className='text-red-700 mt-5'>{error.message}</p>}
    </div>
  );
}
