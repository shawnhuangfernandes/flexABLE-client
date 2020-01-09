import { SIGN_IN } from "./authTypes";

const initialState = {
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
