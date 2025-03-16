
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4_HZCVZDS-34-QO0JeaD0BFxSFVBmhVI",
  authDomain: "cakedelight-79097.firebaseapp.com",
  projectId: "cakedelight-79097",
  storageBucket: "cakedelight-79097.firebasestorage.app",
  messagingSenderId: "463954626749",
  appId: "1:463954626749:web:05d84b65681901a5facfd4",
  measurementId: "G-9E14B5VVES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
