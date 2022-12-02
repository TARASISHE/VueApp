import 'firebase/auth';
import 'firebase/database'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDj6Fsz-Aem3ydUr-LwZB8FrEBsjhb_qgA",
  authDomain: "vue-training-dd609.firebaseapp.com",
  projectId: "vue-training-dd609",
  storageBucket: "vue-training-dd609.appspot.com",
  messagingSenderId: "64576047074",
  appId: "1:64576047074:web:a6c026e1f88360649f5bbb",
  measurementId: "G-EZ89R773TQ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)


export { auth }
