import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../services/api";
import { logout } from "../redux/actionList";
import { Link } from 'react-router-dom'

const SettingsBodyContainer = props => {
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();
  console.log(user);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);

  // probably an async problem with using user
  //firstName and lastName and username are all undefined here

  const onFirstNameChange = e => {
    e.persist();
    setFirstName(firstName);
  };

  const onLastNameChange = e => {
    e.persist();
    setLastName(e.target.value);
  };

  const onDeleteClick = e => {
    // run the api service to delete this account
    api.auth.deleteUser(user).then(message => {
      dispatch(logout());
    });
    // then logout
  };

  return (
    <div>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="name"
            value={firstName}
            onChange={onFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </label>
      </form>
      <Link to="/">
        <button onClick={onDeleteClick}>Delete Account</button>
      </Link>
    </div>
  );
};

export default SettingsBodyContainer;
