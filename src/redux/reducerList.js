import { authReducer } from "./auth/authReducer";
import { calendarReducer } from "./calendar/calendarReducer";
import { combineReducers } from "redux";

// root reducer that contains/combines all the different reducers
const rootReducer = combineReducers({
  authReducer, // handles authorization state
  calendarReducer // handles calendar state
});

export default rootReducer;
