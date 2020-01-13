import { GET_WORKOUTS } from "./workoutTypes";

// Calendar action for when a calendar date is selected
export const getWeekWorkouts = weekWorkouts => { // takes in the date object
    return {
      type: GET_WORKOUTS, // action type
      payload: weekWorkouts // payload is set as the selected date argument
    };
  };