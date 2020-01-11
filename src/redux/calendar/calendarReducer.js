import { SELECT_DATE } from "./calendarTypes";

// set initial state for the selected date
const initialState = {
  selectedDate: {}
};

// calendar reducer that handles redux state when calendar dates are chosen
export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DATE: // if a date has been chosen
      return {
        ...state,
        selectedDate: action.payload // set the selected date state to the payload contained in the action
      };
    default:
      return state;
  }
};
