import firebase from 'firebase/app'
import 'firebase/firestore' 


const firebaseConfig = {
    apiKey: "AIzaSyDv37IX50VIl0QKNd_IlKQeYU5EAZgSjyQ",
    authDomain: "restaurants-70bb4.firebaseapp.com",
    projectId: "restaurants-70bb4",
    storageBucket: "restaurants-70bb4.appspot.com",
    messagingSenderId: "43617016074",
    appId: "1:43617016074:web:6db80a5179780f9649c2f3"
  };

  export const firebaseApp= firebase.initializeApp(firebaseConfig)