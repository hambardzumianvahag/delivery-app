// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRJeqy0txrCOXwOHcgmatCZTL07TK64X8",
  authDomain: "delivery-app-1b637.firebaseapp.com",
  projectId: "delivery-app-1b637",
  storageBucket: "delivery-app-1b637.appspot.com",
  messagingSenderId: "1090426149296",
  appId: "1:1090426149296:web:9a1041378e4b3cafa75e75",
  measurementId: "G-7P0MN8PSKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };