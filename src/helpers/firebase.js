// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVQQOUQQzhRWSvgGJZZa-zj574W_nHgII",
  authDomain: "duocmatico.firebaseapp.com",
  projectId: "duocmatico",
  storageBucket: "duocmatico.appspot.com",
  messagingSenderId: "1014825877918",
  appId: "1:1014825877918:web:da74757ab9f1c6f68b968f",
  measurementId: "G-GPKR26NT1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
