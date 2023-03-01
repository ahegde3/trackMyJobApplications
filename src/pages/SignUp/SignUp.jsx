import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  registerUser,
} from '../../slices/userSlice';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette?.common?.white,
    },
  },
  paper: {
    //   marginTop: theme?.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette?.secondary?.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme?.spacing(3),
  },
  submit: {
    //  margin: theme?.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    email,
    password,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    registerUser,
  } = props;

  return (
    <Container component="main" maxWidth="xs">
      {console.log(props)}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstName || ''}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName || ''}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() =>
            registerUser().then(() => (window.location.href = '/home.html'))
          }
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFirstName: (payload) => dispatch(setFirstName(payload)),
    setLastName: (payload) => dispatch(setLastName(payload)),
    setEmail: (payload) => dispatch(setEmail(payload)),
    setPassword: (payload) => dispatch(setPassword(payload)),
    registerUser: (payload) => dispatch(registerUser(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
