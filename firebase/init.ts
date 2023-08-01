import {FirebaseApp, getApp, getApps, initializeApp} from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBfWzCR4yHVj3URAD7sJQU0izdYFGgh0Eg",
    authDomain: "luganodes-swe.firebaseapp.com",
    projectId: "luganodes-swe",
    storageBucket: "luganodes-swe.appspot.com",
    messagingSenderId: "943480514617",
    appId: "1:943480514617:web:ffa8f235b935dca506c5e8",
    measurementId: "G-CF2L2Z1HPN"
  };
  

let app: FirebaseApp;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
}else {
    app = getApp();
}

export { app }