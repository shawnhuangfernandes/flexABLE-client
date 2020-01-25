import { GET_WORKOUTS} from "./workoutTypes";

// Sets redux state of the current week of workouts
export const getWeekWorkouts = weekWorkouts => {
  return {
    type: GET_WORKOUTS, // action type
    payload: weekWorkouts // payload is set as array of 7 days of workouts
  };
};
