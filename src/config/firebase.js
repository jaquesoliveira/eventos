import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyCMby0dS-T2qw1aoHgOZjLRnfO-WAt5kkg",
  authDomain: "lively-wave-295501.firebaseapp.com",
  databaseURL: "https://lively-wave-295501.firebaseio.com",
  projectId: "lively-wave-295501",
  storageBucket: "lively-wave-295501.appspot.com",
  messagingSenderId: "34660398195",
  appId: "1:34660398195:web:e7ae1fcbcb8bbd6f0a6606"
};

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);