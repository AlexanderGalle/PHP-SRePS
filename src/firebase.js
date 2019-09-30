import firebase from 'firebase/app';
import 'firebase/firestore';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC3nTGgKmbPIYPloy-wF7SM0rZoKF9dBmM",
    authDomain: "dp2-php.firebaseapp.com",
    databaseURL: "https://dp2-php.firebaseio.com",
    projectId: "dp2-php",
    storageBucket: "dp2-php.appspot.com",
    messagingSenderId: "859593286655",
    appId: "1:859593286655:web:cbe695a3636b5e3813fdca"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase