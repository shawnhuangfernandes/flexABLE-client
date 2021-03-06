import { GET_WORKOUTS } from "./workoutTypes";

// set initial state for the selected date
const initialState = {
  selectedWeekWorkouts: [[], [], [], [], [], [], []]
};

// calendar reducer that handles redux state when calendar dates are chosen
export const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKOUTS: // if a date has been chosen
      return {
        selectedWeekWorkouts: action.payload // set the selected date state to the payload contained in the action
      };
    default:
      return state;
  }
};
