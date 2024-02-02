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
  apiKey: "AIzaSyAJyBq1ReEtRanJaW7P7a20C3QeUHTvnUA",
  authDomain: "delivery-app-74c70.firebaseapp.com",
  projectId: "delivery-app-74c70",
  storageBucket: "delivery-app-74c70.appspot.com",
  messagingSenderId: "544927314017",
  appId: "1:544927314017:web:4016aa1d40fd20b5adfa20",
  measurementId: "G-C1DZB3N9W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
