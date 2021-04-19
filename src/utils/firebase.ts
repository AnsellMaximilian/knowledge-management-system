import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDGVln4xAFWvjvlVIbjH69qopgi4lhQYko",
    authDomain: "knowledge-management-sys-e5f4b.firebaseapp.com",
    projectId: "knowledge-management-sys-e5f4b",
    storageBucket: "knowledge-management-sys-e5f4b.appspot.com",
    messagingSenderId: "538959031832",
    appId: "1:538959031832:web:735901bb79a2d89fcbdd6d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db  = firebase.firestore()
const auth = firebase.auth()

export {db, auth}