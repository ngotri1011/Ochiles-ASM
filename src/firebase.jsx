// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEMn-SalEtyuhmLix-L7FXtub9RWfsmrk",
  authDomain: "assignment-fer202-fpt.firebaseapp.com",
  projectId: "assignment-fer202-fpt",
  storageBucket: "assignment-fer202-fpt.firebasestorage.app",
  messagingSenderId: "461901765278",
  appId: "1:461901765278:web:c9fb43b7a10f353a87b98f",
  measurementId: "G-JHC72EYVHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);