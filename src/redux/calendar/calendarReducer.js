import { SELECT_DATE } from "./calendarTypes";

const initialState = {
  selectedDate: {}
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    default:
      return state;
  }
};

export default calendarReducer;