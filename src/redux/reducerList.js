import { authReducer } from "./auth/authReducer";
import { calendarReducer } from "./calendar/calendarReducer";
import { combineReducers } from "redux";
import { workoutReducer } from "./workout/workoutReducer";
import { exerciseReducer } from "./exercise/exerciseReducer";

// root reducer that contains/combines all the different reducers
const rootReducer = combineReducers({
  authReducer, // handles authorization state
  workoutReducer, // handles workout (planner) state
  exerciseReducer // handles exercise state
});

export default rootReducer;
