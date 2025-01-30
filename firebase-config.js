
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDVv4DFtJ5ntDTHM4EupJwy3I7TE3atzg",
  authDomain: "quikdata-d4ce0.firebaseapp.com",
  projectId: "quikdata-d4ce0",
  storageBucket: "quikdata-d4ce0.appspot.com",
  messagingSenderId: "113578329980",
  appId: "1:113578329980:web:4c09488156b023175346f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};

