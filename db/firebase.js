import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDFv-k7MP7bJKHG53zvJ5ZtjDtYoGm53ng",
    authDomain: "weatherapp-36d17.firebaseapp.com",
    projectId: "weatherapp-36d17",
    storageBucket: "weatherapp-36d17.appspot.com",
    messagingSenderId: "657129880992",
    appId: "1:657129880992:web:2386da3c3c0053ffa738c5",
    measurementId: "G-XHZM7WN07W"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}