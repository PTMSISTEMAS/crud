import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD-FaqgZ25EknvcMFLsA2MXP3TWHT5Pvnw",
    authDomain: "crud-c4d71.firebaseapp.com",
    projectId: "crud-c4d71",
    storageBucket: "crud-c4d71.appspot.com",
    messagingSenderId: "732874891452",
    appId: "1:732874891452:web:0b3a26fc3fb1533cfd30b9",
    measurementId: "G-4VWDZJMJ0Z"
  }


  export const firebaseApp = firebase.initializeApp(firebaseConfig)
