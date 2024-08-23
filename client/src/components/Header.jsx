import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-slate-200 p-4'>
        <div className='flex justify-between max-w-6xl mx-auto items-center'>
            <Link to="/">
            <h1 className='font-bold'>App auth</h1>
            </Link>
            <ul className='flex gap-4'>

            <Link to="/">
                <li>Home</li>
                </Link>

            <Link to="/about">
                <li>About</li>
                </Link>

            <Link to="/signin">
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
