import { login, google } from '../firebase/auth.js';
import { navigate, next } from '../router/router';
import logoUrl from '../img/brand-logo.png';

const Login = () => {
  const template = //HTML
  `
    <img src='${logoUrl}' id="logo" class="logo">
    <h2 class="title-form">JunkTube</h2>
    <form id="form" class="form">
        <div id="user-info" >
            <div class="email-info">
                <label for="email">Email: </label>
                <input id="email" class="input-form" type="email" placeholder="Your email">
            </div>
            <div class="password-info">
                <label for="password">Password: </label>
                <input id="password" class="input-form" type="password" placeholder="Your password">
            </div>
        </div>
        <div id="login-btns" class="login-btns">
            <button id="log-in" class="main-btn" type="submit">Sign in</button>
            <p class="or">Or</p>
            <button id="google-btn" class="google-btn">Sign In with Google</button>
        </div>
    </form>
    <div class="signup-link">
        <p>Don't you have an account?</p>
        <a href="#" id="sign-up" class="sign-up">SIGN UP</a>
    </div>
    `;

  const container = document.createElement('div');
  container.innerHTML = template;
  container.className = 'login-box';
  container.id = 'login-box';

  // Log in ENTRAR
  const form = container.querySelector('#form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#password').value;

    try {
      const user = await login(email, password);
      localStorage.setItem('userName', user.user.displayName);
      localStorage.setItem('userUid', user.user.uid);
      localStorage.setItem('userPhoto', user.user.photoURL);
      form.reset();
      navigate('/home');
    } catch (error) {
      if (error === "auth/invalid-email") {
        alert("Please enter a valid email: example@mail.com");
      } else if (error === "auth/missing-email") {
        alert("Please enter a valid email");
      } else if (error === 'auth/internal-error') {
        alert("Please fill in all required fields");
      } else if (error === 'auth/wrong-password') {
        alert("Wrong password");
      } else if (error === 'auth/user-not-found') {
        alert("Ups! You don't have an account");
      }
    }
  });

  // Sign Up REGISTRAR button, to register view
  const signUpBtn = container.querySelector('#sign-up');
  signUpBtn.addEventListener('click', () => {
    next('/register');
  });

  // Signing up with redirect Google
  const googleBtn = container.querySelector('#google-btn');
  googleBtn.addEventListener('click', async () => {
    const user = await google();
    if (user) {
      localStorage.setItem('userName', user.displayName);
      localStorage.setItem('userUid', user.uid);
      localStorage.setItem('userPhoto', user.photoURL);
      navigate('/home');
    } else {
      console.log('Something went wrong. Please try again.');
    }
  });

  return container;
};

export default Login;
