import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5R-mcFvzZD1Q8G-pb66s6jPh_WR8A3HU",
    authDomain: "devblog-e4f0e.firebaseapp.com",
    projectId: "devblog-e4f0e",
    storageBucket: "devblog-e4f0e.appspot.com",
    messagingSenderId: "359434128710",
    appId: "1:359434128710:web:54e61d6033104c70ede947",
    measurementId: "G-M55PBPKJQD"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
