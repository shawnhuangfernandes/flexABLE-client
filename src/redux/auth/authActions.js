import { SIGN_IN } from "./authTypes";
import { LOGOUT } from "./authTypes";

// Action for signing in
export const signIn = loggedInUser => {
  // takes a user object
  return {
    type: SIGN_IN, // sets type for identification
    payload: loggedInUser // payload of action is set as loggedInUser argument
  };
};

// Action for logging out
export const logout = () => {
  return {
    type: LOGOUT // sets type for identification
  };
};
