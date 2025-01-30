import { getCurrentUser, login, signup, logout} from './scripts';

const signupform = document.getElementById('signup-form');

signupform.addEventListener('submit', (event)=>{
    event.defaultPrevented();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        window.location.href = "login.html"
    }
    )
})
