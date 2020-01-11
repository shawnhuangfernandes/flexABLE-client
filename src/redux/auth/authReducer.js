import { SIGN_IN } from "./authTypes";
import { LOGOUT } from "./authTypes";

const initialState = {
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload
      };
      case LOGOUT:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
};

export default authReducer;
