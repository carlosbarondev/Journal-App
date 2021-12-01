import 'firebase/firestore';
import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgro7VcneUvb4_7gX339rvw89tEiku7ys",
    authDomain: "journal-app-1d2fa.firebaseapp.com",
    projectId: "journal-app-1d2fa",
    storageBucket: "journal-app-1d2fa.appspot.com",
    messagingSenderId: "398668733607",
    appId: "1:398668733607:web:cea71ebfdd37dc12914f82"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}