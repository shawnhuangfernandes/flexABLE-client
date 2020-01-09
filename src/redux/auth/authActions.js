import { SIGN_IN } from "./authTypes";

export const signIn = loggedInUser => {
  return {
    type: SIGN_IN,
    payload: loggedInUser
  };
};

// export default signIn;
