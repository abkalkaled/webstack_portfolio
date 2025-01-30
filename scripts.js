// Mock User Credentials
const mockUser = {
  email: "user@example.com",
  password: "password123",
};

// Handle Login Form Submission
function handleLogin(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Authenticate User
  if (email === mockUser.email && password === mockUser.password) {
    alert("Login successful, welcome!");
    window.location.href = "index.html"; // Redirect to the landing page
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

// Attach Event Listener to Login Form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

/////SIGNUP

// Handle Signup Form Submission
function handleSignup(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("number").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();

  // Validate inputs
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert("All fields are required. Please fill out the form completely.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePhoneNumber(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Save user data to localStorage
  const user = { name, email, phone, password };
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to the login page
  alert("Signup successful! Please log in.");
  window.location.href = "login.html";
}

// Validate Email Format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Phone Number (Nigerian format example)
function validatePhoneNumber(phone) {
  const phoneRegex = /^0[7-9][0-1][0-9]{8}$/;
  return phoneRegex.test(phone);
}

// Attach Event Listener to Signup Form
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
});

//LOGIN ACCESS
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, allow access
    console.log("User logged in:", user.email);
  } else {
    // User not logged in, redirect to login
    window.location.href = "login.html";
  }
});

//SAVE DATA AT SIGNUP
import {
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const db = getFirestore();

async function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("number").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    });

    alert("Signup successful!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error during signup:", error.message);
    alert(`Error: ${error.message}`);
  }
}

//DASHBoARd Authentication
const auth = getAuth();

// Redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    document.getElementById(
      "welcome-message"
    ).textContent = `Welcome, ${user.email}`;
  } else {
    console.log("No user is logged in.");
    window.location.href = "login.html"; // Redirect to login if no user
  }
});

//Fetch and Display users Data
import { getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const db = getFirestore();

// Function to fetch user data
async function fetchUserData(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    document.getElementById(
      "wallet-balance"
    ).textContent = `Wallet Balance: ₦${userData.wallet}`;
    console.log("User data:", userData);
  } else {
    console.log("No such document!");
  }
}

// Call the function after confirming the user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchUserData(user.uid); // Fetch data using the user's ID
  }
});

//Dashboard Logout

import { signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

//HAndles Transcation Data
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

async function addTransaction(userId, amount, plan) {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      userId: userId,
      plan: plan,
      amount: amount,
      timestamp: new Date(),
    });
    console.log("Transaction added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

// Call this function when a user makes a purchase
addTransaction(user.uid, 300, "1GB Plan");

// Recent Transcation
import {
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

async function fetchTransactions(userId) {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log("Transaction:", doc.data());
    // Dynamically display transactions on the page
    const transactionList = document.getElementById("transaction-history");
    const li = document.createElement("li");
    li.textContent = `${doc.data().plan} - ₦${doc.data().amount}`;
    transactionList.appendChild(li);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchTransactions(user.uid); // Fetch transactions for the logged-in user
  }
});

