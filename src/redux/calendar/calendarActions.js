import { SELECT_DATE } from "./calendarTypes";

export const setCurrentDate = selectedDate => {
    return {
      type: SELECT_DATE,
      payload: selectedDate
    };
  };