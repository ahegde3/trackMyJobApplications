import React from 'react';
import { connect } from 'react-redux';
import TitleComponent from '../../containers/TitleComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { userLogin, setRegisteredUser } from '../../slices/userSlice';
import { MESSAGES } from '../../constants/message';

function Login(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { setRegisteredUser, userLogin } = props;
  const responseGoogle = (response) => {
    console.log(response.credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const signInHandler = async () => {
    if (email && password)
      await userLogin({ email, password }).then((res) => {
        if (chrome) {
          chrome.runtime.sendMessage({
            message: MESSAGES.LOGIN,
            uid: res.payload?.uid,
          });
        }
      });
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
            <Button
              variant="contained"
              onClick={() => setRegisteredUser(false)}
            >
              SignUp
            </Button>
          </div>
        </div>
        {/* <div className="social-login">
          or
          <GoogleOAuthProvider clientId="249610384975-sbi686dvvv4pphc6293qj3tjfia1fbar.apps.googleusercontent.com">
            <GoogleLogin onSuccess={responseGoogle} onError={errorMessage} />
          </GoogleOAuthProvider>
        </div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (payload) => dispatch(userLogin(payload)),
    setRegisteredUser: (payload) => dispatch(setRegisteredUser(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
