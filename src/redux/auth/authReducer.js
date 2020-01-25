import { SIGN_IN } from "./authTypes";
import { LOGOUT } from "./authTypes";

// sets initial state for reducer
const initialState = {
  user: {} // no user should be logged in initially
};

// auth reducer to handle redux actions for logging in and out
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: // if the action is a sign in action
      return {
        ...state,
        user: action.payload // set the user as the user contained in the action payload
      };
      case LOGOUT: // if the action is a logout action
      return {
        ...state,
        user: {} // clear the user from state
      };
    default:
      return state;
  }
};

