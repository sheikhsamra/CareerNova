import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD34CRFmdHLf2ceDeSNXAsvHCD82Xih4po",
  authDomain: "resumebuilder-ad6c2.firebaseapp.com",
  projectId: "resumebuilder-ad6c2",
  storageBucket: "resumebuilder-ad6c2.firebasestorage.app",
  messagingSenderId: "762069364067",
  appId: "1:762069364067:web:fb8ee0f09efe66546a3756",
  measurementId: "G-G96R7Y7HPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Named export for auth
export const auth = getAuth(app);