import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAolcOMtt_vfvFYTbrlkBd9jMQPSQP5xz8",
  authDomain: "clone-115a8.firebaseapp.com",
  databaseURL: "https://clone-115a8.firebaseio.com",
  projectId: "clone-115a8",
  storageBucket: "clone-115a8.appspot.com",
  messagingSenderId: "383838442387",
  appId: "1:383838442387:web:6165895360a7c943f18e66",
  measurementId: "G-T27VBXGW3J",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); //initialize the firebase app... because just now u enabled the email configuration
const db = firebaseApp.firestore(); //this is to initalize the firebase data app
const auth = firebase.auth(); //this gives a variable to help in signing in

export { db, auth };
