import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { api } from "../services/api";
import {useDispatch} from 'react-redux'

const SignIn = props => {
  // React hook to use Redux dispatch
  const dispatch = useDispatch()

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

  // create state of first name
  const [firstName, setFirstName] = useState("");

  // create state of last name
  const [lastName, setLastName] = useState("");

  // event handler for when username field changes
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  // event handler for when password changes
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  // event handler for when password changes
  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  // event handler for when password changes
  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  // event handler for when form is submitted
  const handleSubmit = e => {
    e.preventDefault();
    api.auth
      .signUp({
        user: {
          username,
          password,
          first_name: firstName,
          last_name: lastName
        }
      })
      .then(response => {
        if (!response.error) {
          props.onLogin(response);
          props.history.push("/");
        } else {
          console.log("Got an error here");
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            onChange={handleFirstNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="last_name"
            autoFocus
            onChange={handleLastNameChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
