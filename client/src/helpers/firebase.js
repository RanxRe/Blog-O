// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnvName } from "./getEnvName.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnvName("VITE_FIREBASE_API"),
  authDomain: "blog-o-eaef2.firebaseapp.com",
  projectId: "blog-o-eaef2",
  storageBucket: "blog-o-eaef2.firebasestorage.app",
  messagingSenderId: "245708371465",
  appId: "1:245708371465:web:9d67ddab4bdde1bfd8ead8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
