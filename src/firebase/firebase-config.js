// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNdZFYKhswEA02E4qRufusdSuq-PJEGhU",
  authDomain: "delivery-app-3574c.firebaseapp.com",
  projectId: "delivery-app-3574c",
  storageBucket: "delivery-app-3574c.appspot.com",
  messagingSenderId: "894603341828",
  appId: "1:894603341828:web:14c2677967b97385498551",
  measurementId: "G-58L137JEN6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
