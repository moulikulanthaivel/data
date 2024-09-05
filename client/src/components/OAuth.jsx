import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {

  const handleGoogleClick = async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)

      const result =await signInWithPopup(auth , provider);
      console.log(result)
    } catch (error) {
      console.log('could not login with  google' , error)
    }
  }

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white uppercase rounded-lg p-3 hover:opacity-95'>continue with google</button>
  )
}
