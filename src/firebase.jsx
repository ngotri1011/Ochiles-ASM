// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPABHx_lo4N5bJY3W2nvfYpHjQtEJwMqw",
  authDomain: "orchiles-s.firebaseapp.com",
  projectId: "orchiles-s",
  storageBucket: "orchiles-s.firebasestorage.app",
  messagingSenderId: "271819664272",
  appId: "1:271819664272:web:fc5b7dd98ba3001cd92115",
  measurementId: "G-DK0F19R90P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);