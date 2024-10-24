// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO5uHgcebEmhiRv3KJgLFUxgPcqEzBpfM",
    authDomain: "htesting-1524d.firebaseapp.com",
    projectId: "htesting-1524d",
    storageBucket: "htesting-1524d.appspot.com",
    messagingSenderId: "589403640549",
    appId: "1:589403640549:web:b712216f30180331c3fa0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };