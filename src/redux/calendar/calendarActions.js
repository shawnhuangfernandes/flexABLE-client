import { SELECT_DATE } from "./calendarTypes";

// Calendar action for when a calendar date is selected
export const setCurrentDate = selectedDate => { // takes in the date object
    return {
      type: SELECT_DATE, // action type
      payload: selectedDate // payload is set as the selected date argument
    };
  };