
import { initializeApp } from "firebase/app";
import{getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeaK_gWQ9uejDXu3Y_77n-GYZSFqQchZo",
  authDomain: "tiny-pesa-app.firebaseapp.com",
  projectId: "tiny-pesa-app",
  storageBucket: "tiny-pesa-app.appspot.com",
  messagingSenderId: "863207817007",
  appId: "1:863207817007:web:60efcd7ab7c070a044ebda",
  measurementId: "G-ZQN3RPBG7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage=getStorage(app);


export{ projectStorage,ref,getDownloadURL,uploadBytesResumable};