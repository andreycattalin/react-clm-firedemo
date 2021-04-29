import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "XXXX",
    authDomain: "XXXXXX-XXXX.firebaseapp.com",
    databaseURL: "https://XX-XXXX.firebaseio.com",
    projectId: "X-X",
    storageBucket: "X-X.appspot.com",
    messagingSenderId: "X",
    appId: "1:X:web:X"
};

firebase.initializeApp(firebaseConfig);


export { firebase }