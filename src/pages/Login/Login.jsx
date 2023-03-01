import React from 'react';
import TitleComponent from '../../containers/TitleComponent';
import { auth } from '../services/firebase';
// import { GoogleLogin } from '@leecheuk/react-google-login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './';
import { signInUser } from '../../api/user';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export default function Login(props) {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const routeChange = () => {
    let path = `/signup.html`;

    window.location.href = path;
  };
  const responseGoogle = (response) => {
    console.log(response.credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const signInHandler = async () => {
    console.log(email, password);
    if (email && password)
      await signInUser(email, password)
        .then((res) => {
          console.log(res);
          window.location.href = '/home.html';
        })
        .catch((e) => console.log(e));
  };
  return (
    <div className="login-container">
      <TitleComponent />

      <div className="login-input">
        <div className="user-input-container">
          <TextField
            required
            id="outlined-required"
            label="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            value={password || ''}
            label="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-button-container">
            <Button variant="contained" onClick={signInHandler}>
              Login
            </Button>
            <Button variant="contained" onClick={routeChange}>
              SignUp
            </Button>
          </div>
        </div>
        <div className="social-login">
          or
          {/* <GoogleLogin
            clientId="249610384975-sbi686dvvv4pphc6293qj3tjfia1fbar.apps.googleusercontent.com"
            buttonText="Login with gmail"
            style={{ width: '70%' }}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          /> */}
          <GoogleOAuthProvider clientId="249610384975-sbi686dvvv4pphc6293qj3tjfia1fbar.apps.googleusercontent.com">
            <GoogleLogin onSuccess={responseGoogle} onError={errorMessage} />;
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
