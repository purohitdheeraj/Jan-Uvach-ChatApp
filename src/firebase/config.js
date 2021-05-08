// import * as firebase from 'firebase/app';
import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore'
import 'firebase/auth';

// import firestore from 'firebase/app';
// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyA5Z6ilunbes7dAOgLnDkbRKWxTtalsgEQ",
    authDomain: "jan-uvach.firebaseapp.com",
    databaseURL: "https://jan-uvach-default-rtdb.firebaseio.com",
    projectId: "jan-uvach",
    storageBucket: "jan-uvach.appspot.com",
    messagingSenderId: "1041759603071",
    appId: "1:1041759603071:web:854f187165b0463c2c324a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();


const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectStorage, projectFirestore, projectAuth, timestamp};