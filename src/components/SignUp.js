// React specific imports
import React, { useState } from "react";
import { api } from "../services/api";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actionList";

// MUI imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

  // material UI styles
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: '50%',
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

const SignIn = props => {
  // React hook to use Redux dispatch
  const dispatch = useDispatch();

  // material UI setting for ease of access (reference above)
  const classes = useStyles();

  const [username, setUsername] = useState("");   // local state of username (controlled form)

  // create state of password
  const [password, setPassword] = useState(""); // local state of password (controlled form)

  // create state of first name
  const [firstName, setFirstName] = useState(""); // local state of first name (controlled form)

  // create state of last name
  const [lastName, setLastName] = useState(""); // local state of last name (controlled form)

  // create a ref for the username and/or password
  const usernameInput = React.createRef();
  const passwordInput = React.createRef();

  // EVENT HANDLER - for when username field changes
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  // EVENT HANDLER - for when password changes
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  // EVENT HANDLER - for when password changes
  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  // EVENT HANDLER - for when password changes
  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  // EVENT HANDLER - for when form is submitted
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
      .then(userData => {
        if (!userData.error) {
          localStorage.setItem("token", userData.jwt); // assign the local storage token of the logged in user as the user's JWT encrypted token
          dispatch(signIn(userData));
          props.history.push("/dashboard/planner");
        } else {
          console.log("Got an error here");
          // where I want to add the error props on both username input and password input
          console.log(usernameInput);
          console.log(passwordInput);
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
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            ref={usernameInput}
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
            ref={passwordInput}
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
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already Have an Account? Sign In."}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignIn;
