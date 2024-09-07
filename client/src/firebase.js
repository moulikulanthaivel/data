// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-app-bcdf5.firebaseapp.com",
  projectId: "mern-auth-app-bcdf5",
  storageBucket: "mern-auth-app-bcdf5.appspot.com",
  messagingSenderId: "85697719806",
  appId: "1:85697719806:web:8c2b56026a969701b0a4af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 