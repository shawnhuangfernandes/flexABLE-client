import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../services/api";
import { getWeekWorkouts } from "../redux/actionList";

const NewExerciseSelector = props => {
  const user = useSelector(state => state.authReducer.user); // redux state to grab logged in user
  const exercises = useSelector(state => state.exerciseReducer.exercises); // redux state to grab exercises for drop down
  const week = useSelector(state => state.workoutReducer.selectedWeekWorkouts); // get redux state for the selected week

  const [exerciseId, setExerciseId] = useState(1); // local state for exercise id from drop down selection
  const [description, setDescription] = useState(""); // local state for description on text field

  const dispatch = useDispatch(); // dispatch for updating redux state

  // EVENT HANDLER: when description text field is typed in
  const onDescriptionChange = e => {
    e.persist();
    setDescription(e.target.value);
  };

  // EVENT HANDLER: when form is submitted to create a new workout
  const onCreateWorkout = e => {
    e.preventDefault();

    const workoutInfo = {
      user_id: user.id,
      exercise_id: exerciseId,
      completed: false,
      description: description,
      workout_date: new Date(
        props.currentDate.year,
        props.currentDate.month - 1,
        props.currentDate.day
      )
    };

    api.workouts.createNewWorkout(workoutInfo).then(workout => {
      dispatch(getWeekWorkouts(addNewWorkout(workout)));
    });
  };

  // EVENT HANDLER: when a drop down option is selected
  const onSelectExercise = e => {
    e.persist();
    setExerciseId(e.target.value);
  };

  // this method updates the current redux state by adding a new workout to the appropriate day of the week
  const addNewWorkout = workout => {
    const dayOfTheWeek = dateRbFormatter(workout.workout_date).getDay();
    const returnedCopy = [...week];
    returnedCopy[dayOfTheWeek].push(workout);
    return returnedCopy;
  };

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
  };

  // this maps the exercises to options for the drop down
  const getExerciseOptions = () => {
    return (
      <select onChange={onSelectExercise} value={exerciseId}>
        {exercises.map(exercise => {
          return (
            <option key={Math.random()} value={exercise.id}>
              {exercise.name}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div>
      <form onSubmit={onCreateWorkout}>
        {getExerciseOptions()}
        <input
          type="text"
          name="name"
          value={description}
          onChange={onDescriptionChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewExerciseSelector;
