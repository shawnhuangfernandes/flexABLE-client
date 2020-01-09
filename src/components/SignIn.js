import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { api } from "../services/api";
import { signIn } from "../redux/index";
import { connect } from "react-redux";

const SignIn = (props) => {
  // material UI styles
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));

  // material UI setting for ease of access (reference above)
  const classes = useStyles();

  // create state of username
  const [username, setUsername] = useState("");

  // create state of password
  const [password, setPassword] = useState(""); 

  // event handler for when username field changes
  const handleUsernameChange = e => {
    setUsername(e.target.value); 
  };

  // event handler for when password changes
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  // event handler for when form is submitted
  const handleSubmit = e => {
    e.preventDefault(); // prevent refresh behavior on form submit
    api.auth
      .login({ username: username, password: password }) // use API AUTH service method to post 'login' to get userData
      .then(userData => { // after we get back the userData
        if (!userData.error) { // if the returned userData DID NOT have a login error
          localStorage.setItem('token', userData.jwt); // assign the local storage token of the logged in user as the user's JWT encrypted token
          props.signIn(userData);
          props.history.push("/");
        } else {
          console.log('Got an error here');
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch, user) => {
  return {
    signIn: () => dispatch(signIn(user))
  };
};

export default connect(null, mapDispatchToProps)(SignIn)
