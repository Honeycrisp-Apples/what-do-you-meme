import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyCdFHZ-nU0tLz2lythaZPaqK3qTG83JH4I',
    authDomain: 'memer-365.firebaseapp.com',
    databaseURL: 'https://memer-365.firebaseio.com',
    projectId: 'memer-365',
    storageBucket: 'memer-365.appspot.com',
    messagingSenderId: '754909736770',
    appId: '1:754909736770:web:362d8496dc4c1fae5b22db',
    measurementId: 'G-5T5T6J15VF',
  };
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore()

export default firebase
