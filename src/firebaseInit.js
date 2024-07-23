// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi7Bmz2xrhXd8-F9PAWOi4bwNbB2bSs2w",
  authDomain: "bloggingapp-abbdb.firebaseapp.com",
  projectId: "bloggingapp-abbdb",
  storageBucket: "bloggingapp-abbdb.appspot.com",
  messagingSenderId: "1061584994997",
  appId: "1:1061584994997:web:cec66897e146f19da834fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);