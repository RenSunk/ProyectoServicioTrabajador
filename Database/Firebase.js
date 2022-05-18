import firebase from "firebase"

const firebaseConfig ={
    apiKey: "AIzaSyDXERlyEvWIVgpBZCiNzMPL1h85lLLDp3s",
    authDomain: "servicioandroid-d0467.firebaseapp.com",
    databaseURL: "https://servicioandroid-d0467.firebaseio.com",
    projectId: "servicioandroid-d0467",
    storageBucket: "servicioandroid-d0467.appspot.com",
    messagingSenderId: "884923458394",
    appId: "1:884923458394:web:fbc2f25bd19a3b79198963",
    measurementId: "G-0V75QJ5P9K"
}

firebase.initializeApp(firebaseConfig);

export default firebase