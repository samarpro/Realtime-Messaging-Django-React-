// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, FacebookAuthProvider, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVivex5myNLbJAqxvEYxjXW3drrAoZMuA",
    authDomain: "databs-a910d.firebaseapp.com",
    projectId: "databs-a910d",
    storageBucket: "databs-a910d.appspot.com",
    messagingSenderId: "867499172017",
    appId: "1:867499172017:web:41392706b29d7e7bc88290",
    measurementId: "G-VK309PEJLM",
};

// Initialize Firebase apps and getting reference to the service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

// object of provider
const Facebookprovider = new FacebookAuthProvider
const GoogleProvider = new GoogleAuthProvider

export {auth, Facebookprovider,GoogleProvider }

