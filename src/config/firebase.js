
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGZxKVLyh4T0BtYpZuL_2RMvvxRGLpd9g",
  authDomain: "cakedelight-app.firebaseapp.com",
  projectId: "cakedelight-app",
  storageBucket: "cakedelight-app.appspot.com",
  messagingSenderId: "759267548852",
  appId: "1:759267548852:web:cb9c1d75fc19b3a50cc09d",
  measurementId: "G-N0F0HT7E55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
