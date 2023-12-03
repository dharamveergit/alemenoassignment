// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZdof9Vq1NlpB0bjpi0nsErFNw-_riCcg",
  authDomain: "mainfirebase-bae39.firebaseapp.com",
  projectId: "mainfirebase-bae39",
  storageBucket: "mainfirebase-bae39.appspot.com",
  messagingSenderId: "985332626964",
  appId: "1:985332626964:web:bb9fbbc7c8cf36616f9901",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
