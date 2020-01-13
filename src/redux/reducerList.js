import { authReducer } from "./auth/authReducer";
import { calendarReducer } from "./calendar/calendarReducer";
import { combineReducers } from "redux";
import { workoutReducer } from "./workout/workoutReducer"

// root reducer that contains/combines all the different reducers
const rootReducer = combineReducers({
  authReducer, // handles authorization state
  calendarReducer, // handles calendar state
  workoutReducer // handles workout (planner) state
});

export default rootReducer;
