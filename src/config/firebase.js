// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjg2cZDV_CRAvvL1dGD3jEh6zimYQIZ_M",
    authDomain: "zohaib-web-assignments.firebaseapp.com",
    projectId: "zohaib-web-assignments",
    storageBucket: "zohaib-web-assignments.firebasestorage.app",
    messagingSenderId: "1086528776731",
    appId: "1:1086528776731:web:34f30a8eab535abfed26be",
    measurementId: "G-6GQJFTPPQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app);
export {analytics,auth, firestore,storage}