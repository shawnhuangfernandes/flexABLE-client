import React, { useState } from "react";
import { useSelector } from "react-redux";

const SettingsBodyContainer = props => {
  const user = useSelector(state => state.authReducer.user);

    console.log(user);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  console.log(firstName);
  const [username, setUsername] = useState(user.username);

  const onFirstNameChange = e => {
    e.persist();
    setFirstName(e.target.value);
  };

  const onLastNameChange = e => {
    e.persist();
    setLastName(e.target.value);
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
        <br></br>
        <label>
          Last Name:
          <input
            type="text"
            name="name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </label>
        <br></br>
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
    </div>
  );
};

export default SettingsBodyContainer;
