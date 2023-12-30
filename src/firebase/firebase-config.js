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
  apiKey: "AIzaSyCNh89T8eEPZFnENtmdRILAF2dFfVzhyvc",
  authDomain: "delivery-app-c1682.firebaseapp.com",
  projectId: "delivery-app-c1682",
  storageBucket: "delivery-app-c1682.appspot.com",
  messagingSenderId: "452790807575",
  appId: "1:452790807575:web:6e1bf5b96d30af092ac052",
  measurementId: "G-W3DRCJ053L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
