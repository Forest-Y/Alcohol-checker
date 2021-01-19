import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app"
import "firebase/database"
var firebaseConfig = {
    apiKey: "AIzaSyAAIk-COb9LD3vUDs7dueLKkpgqKhg5qeY",
    authDomain: "alcohol-55664.firebaseapp.com",
    databaseURL: "https://alcohol-55664.firebaseio.com",
    projectId: "alcohol-55664",
    storageBucket: "alcohol-55664.appspot.com",
    messagingSenderId: "807932708353",
    appId: "1:807932708353:web:4f529f7c2372d72d4ce200"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
/*
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
*/
export { firebase }
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
