import { GET_EXERCISES } from "./exerciseTypes";

// set initial state for the selected date
const initialState = {
  exercises: []
};

// calendar reducer that handles redux state when calendar dates are chosen
export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXERCISES: // if a date has been chosen
      return {
        ...state,
        exercises: action.payload // set the selected date state to the payload contained in the action
      };
    default:
      return state;
  }
};
