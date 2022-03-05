import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB4YRJSPGAtqLZFSui1veKmwTKYmhKRgOg",
    authDomain: "mdnotes-ef56e.firebaseapp.com",
    projectId: "mdnotes-ef56e",
    storageBucket: "mdnotes-ef56e.appspot.com",
    messagingSenderId: "168059691646",
    appId: "1:168059691646:web:c94b879477f3850ce6ee2f",
    measurementId: "G-BJFQEXMK86"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);