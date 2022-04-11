import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {

  apiKey: "AIzaSyDgWlJI3oyqUK6jhI_WVIFvRRNeDRTA8yQ",
  authDomain: "amaz-project-d2fc1.firebaseapp.com",
  databaseURL: "https://amaz-project-d2fc1-default-rtdb.firebaseio.com",
  projectId: "amaz-project-d2fc1",
  storageBucket: "amaz-project-d2fc1.appspot.com",
  messagingSenderId: "20193738287",
  appId: "1:20193738287:web:087d55a3373ba72723d0da",

};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();


export default fire;