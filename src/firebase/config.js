// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6S_TCJ3TFQLvFQs6UxDrsuiNhZXpP2oQ",
    authDomain: "journal-app-curso-react-eb66d.firebaseapp.com",
    projectId: "journal-app-curso-react-eb66d",
    storageBucket: "journal-app-curso-react-eb66d.appspot.com",
    messagingSenderId: "451195696011",
    appId: "1:451195696011:web:d4f975e52a7120af29b58e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
