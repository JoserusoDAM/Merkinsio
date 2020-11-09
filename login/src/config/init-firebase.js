import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDadKf_MWP2fbysl-WaAVPXU-RaLP7uhfk",
    authDomain: "login-d33b7.firebaseapp.com",
    databaseURL: "https://login-d33b7.firebaseio.com",
    projectId: "login-d33b7",
    storageBucket: "login-d33b7.appspot.com",
    messagingSenderId: "1019834087416",
    appId: "1:1019834087416:web:e640ba5e40ebc81faf080d",
    measurementId: "G-LP1QNHPK3M"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
 
  // Initialize Firebase
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
export {googleAuthProvider, fire, db};

 