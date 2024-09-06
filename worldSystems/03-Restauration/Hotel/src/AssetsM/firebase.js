// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZMrqfYqMXiJIX4_S-20YHBbjjqgtdJhM",
  authDomain: "abyedh-com.firebaseapp.com",
  projectId: "abyedh-com",
  storageBucket: "abyedh-com.appspot.com",
  messagingSenderId: "622105310544",
  appId: "1:622105310544:web:bb5010f23dd608eb8ca855",
  measurementId: "G-HGJT68ZN4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };