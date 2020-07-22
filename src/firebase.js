import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCRi9vmcxcrFGBwjmcikvi2K3wGK5TaMlQ",
    authDomain: "ig-clone-fd.firebaseapp.com",
    databaseURL: "https://ig-clone-fd.firebaseio.com",
    projectId: "ig-clone-fd",
    storageBucket: "ig-clone-fd.appspot.com",
    messagingSenderId: "863503656963",
    appId: "1:863503656963:web:9712febda47c25fdb18636",
    measurementId: "G-NL4BYESE31",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export  { db, auth, storage };
