// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi61rISFcK9lJZgEKyyKrnruFM2E-xYwo",
  authDomain: "quora-clone-83420.firebaseapp.com",
  projectId: "quora-clone-83420",
  storageBucket: "quora-clone-83420.appspot.com",
  messagingSenderId: "929027432585",
  appId: "1:929027432585:web:f07d2c8c2b0a61c30ca658",
  measurementId: "G-8BRXWJ61DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const provider= new GoogleAuthProvider();
export {auth,provider}
