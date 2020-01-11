import { SIGN_IN } from "./authTypes";
import { LOGOUT } from "./authTypes"

export const signIn = loggedInUser => {
  return {
    type: SIGN_IN,
    payload: loggedInUser
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// export default signIn;
