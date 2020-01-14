import { GET_EXERCISES } from "./exerciseTypes";

// Calendar action for when a calendar date is selected
export const setExerciseList = exercises => { // takes in the date object
    return {
      type: GET_EXERCISES, // action type
      payload: exercises // payload is set as the selected date argument
    };
  };