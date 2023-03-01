// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAOYRckx2SNeKT0kdiZSVA8FKBL8JKKJKY",
    authDomain: "job-tracker-b6e98.firebaseapp.com",
    projectId: "job-tracker-b6e98",
    storageBucket: "job-tracker-b6e98.appspot.com",
    messagingSenderId: "471552146703",
    appId: "1:471552146703:web:cd9400bcdd9f4e45b6127a",
    measurementId: "G-5FZNCTFSSQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}

