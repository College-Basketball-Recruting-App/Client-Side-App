import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx3prmItNmGz3hq6lxdJohF6jQhCo17lI",
    authDomain: "collegebballrecruiting-af28d.firebaseapp.com",
    projectId: "collegebballrecruiting-af28d",
    storageBucket: "collegebballrecruiting-af28d.appspot.com",
    messagingSenderId: "791781554286",
    appId: "1:791781554286:web:e945c6d2d4cfe74b278e7f"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)