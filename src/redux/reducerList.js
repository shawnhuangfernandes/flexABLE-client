import { authReducer } from "./auth/authReducer";
import { calendarReducer } from "./calendar/calendarReducer";
import { combineReducers } from "redux";
import { workoutReducer } from "./workout/workoutReducer"
import { exerciseReducer } from "./exercise/exerciseReducer"

// root reducer that contains/combines all the different reducers
const rootReducer = combineReducers({
  authReducer, // handles authorization state
  calendarReducer, // handles calendar state
  workoutReducer, // handles workout (planner) state
  exerciseReducer
});

export default rootReducer;
