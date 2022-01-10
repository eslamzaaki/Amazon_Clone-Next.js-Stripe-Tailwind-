// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDGZTmeUzfk35F29vR5NX6Y2E5BdmvFOSU",
	authDomain: "clone-adfac.firebaseapp.com",
	projectId: "clone-adfac",
	storageBucket: "clone-adfac.appspot.com",
	messagingSenderId: "480240642727",
	appId: "1:480240642727:web:e339935452db7091f24982",
};

// Initialize Firebase
const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();
export const db = app.firestore();
