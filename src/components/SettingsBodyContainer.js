// React specific imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../services/api";
import { logout } from "../redux/actionList";

// MUI imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

const SettingsBodyContainer = props => {
  const classes = useStyles(); // material UI setting for ease of access (reference above)

  const user = useSelector(state => {
    return state.authReducer.user;
  }); // grab the user from redux store

  const dispatch = useDispatch(); // used for dispatching actions to redux store

  const [firstName, setFirstName] = useState(user.first_name); // local state for user first name (controlled form)
  const [lastName, setLastName] = useState(user.last_name); // local state for user last name (controlled form)
  const [username, setUsername] = useState(user.username); // local state for username (controlled form)

  // EVENT HANDLER - username change
  const onUsernameChange = e => {
    e.persist();
    setUsername(e.target.value);
  };

  // EVENT HANDLER - first name change
  const onFirstNameChange = e => {
    e.persist();
    setFirstName(e.target.value);
  };

  // EVENT HANDLER - last name change
  const onLastNameChange = e => {
    e.persist();
    setLastName(e.target.value);
  };

  // EVENT HANDLER - form submission
  const onSubmitForm = e => {};

  // EVENT HANDLER - delete button click
  const onDeleteClick = e => {
    // run the api service to delete this account
    api.auth.deleteUser(user).then(message => {
      dispatch(logout());
    });
    // then logout
  };

  return (
    <Container className={classes.root }component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Your Account
        </Typography>
        <form className={classes.form} onSubmit={onSubmitForm}>
          <TextField
            required
            margin="normal"
            id="standard-required"
            fullWidth
            value={username ? username : user.username}
            onChange={onUsernameChange}
          />
          <TextField
            required
            margin="normal"
            id="standard-required"
            fullWidth
            value={firstName ? firstName : user.first_name}
            onChange={onFirstNameChange}
          />
          <TextField
            required
            margin="normal"
            id="standard-required"
            fullWidth
            value={lastName ? lastName : user.last_name}
            onChange={onLastNameChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Changes
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onDeleteClick}
            className={classes.submit}
          >
            Submit Changes
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SettingsBodyContainer;
