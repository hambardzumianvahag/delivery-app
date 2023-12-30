// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDy6yzNlX9ufWbUZ3SRbpz5VQs7JACqo4",
  authDomain: "delivery-app-4ee14.firebaseapp.com",
  projectId: "delivery-app-4ee14",
  storageBucket: "delivery-app-4ee14.appspot.com",
  messagingSenderId: "91908139446",
  appId: "1:91908139446:web:e162852c461633ee9bb917",
  measurementId: "G-TPGKB4SK45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
