import React from 'react';
import TitleComponent from '../../containers/TitleComponent';
import { GoogleLogin } from '@leecheuk/react-google-login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './';

export default function Login(props) {
  const routeChange = () => {
    let path = `/signup.html`;

    window.location.href = path;
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div className="login-container">
      <TitleComponent />

      <div className="login-input">
        <div className="user-input-container">
          <TextField required id="outlined-required" label="Username" />

          <TextField
            required
            id="outlined-required"
            label="password"
            type="password"
          />
          <div className="login-button-container">
            <Button variant="contained">Login</Button>
            <Button variant="contained" onClick={routeChange}>
              SignUp
            </Button>
          </div>
        </div>
        <div className="social-login">
          or
          <GoogleLogin
            clientId="249610384975-sbi686dvvv4pphc6293qj3tjfia1fbar.apps.googleusercontent.com"
            buttonText="Login with gmail"
            style={{ width: '70%' }}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
}
