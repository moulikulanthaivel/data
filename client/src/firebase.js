// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-web-a288b.firebaseapp.com",
  projectId: "mern-auth-web-a288b",
  storageBucket: "mern-auth-web-a288b.appspot.com",
  messagingSenderId: "338771651248",
  appId: "1:338771651248:web:f15b8c08261f82c18fa975"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);