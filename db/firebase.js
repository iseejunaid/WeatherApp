import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "firebaseapikey",
    authDomain: "authdomain",
    projectId: "projectid",
    storageBucket: "storage",
    messagingSenderId: "id",
    appId: "app_id",
    measurementId: "m_id"
  };
//get these yourself!

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}
