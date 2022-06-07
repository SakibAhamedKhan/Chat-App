// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBowW_yHiABWKiqqAAEBZeaRya96I7fd4c",
  authDomain: "chat-app-d8f87.firebaseapp.com",
  projectId: "chat-app-d8f87",
  storageBucket: "chat-app-d8f87.appspot.com",
  messagingSenderId: "429835034387",
  appId: "1:429835034387:web:d8e05467958e30ae2e04e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

/// user1 : Sakibkhancrs1@gmail.com  123456
/// user1 : Sakibkhancrs1@gmail.com  123456