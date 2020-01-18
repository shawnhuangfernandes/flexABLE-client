import React, { useState } from "react";
import { api } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getWeekWorkouts } from "../redux/actionList";

// This is the workout item that displays a specific workout with a delete button, description, and complete button
const WorkoutItem = props => {
  const dispatch = useDispatch(); // allow this component to change redux state
  const week = useSelector(state => state.workoutReducer.selectedWeekWorkouts); // get redux state for the selected week

    const [description, setDescription] = useState(props.workout.description)

  // this method returns the new version of the week after a specific workout has been updated
  const updateWorkoutList = updatedWorkout => {
    // map through the week, and find the day which the updated workout resides, and update the entry
    const updatedWeek = week.map(day => {
      return day.map(workout => {
        return workout.id !== updatedWorkout.id ? workout : updatedWorkout;
      });
    });

    return updatedWeek;
  };

  // this method returns the new version of the week after a specific workout has been updated
  const deleteWorkout = workoutToDelete => {
    // map through the week, and find the day which the updated workout resides, and update the entry
    const updatedWeek = week.map(day => {
      return day.filter(workout => {
        return workout.id !== workoutToDelete.id;
      });
    });

    console.log(updatedWeek);
    return updatedWeek;
  };

  const onToggleCompletion = e => {
    // run api service to update the workout with the toggled completion status
    api.workouts
      .updateWorkout({
        ...props.workout,
        completed: !props.workout.completed
      })
      .then(
        updatedWorkout =>
          dispatch(getWeekWorkouts(updateWorkoutList(updatedWorkout))) // dispatch the UPDATED WORKOUT LIST
      );
  };

  const onUpdateDescription = e => {
    e.preventDefault();     
    e.persist();
    console.dir(e.target['description'].value);
  }

  const onDeleteWorkout = e => {
    api.workouts.deleteWorkout(props.workout).then(message => {
      dispatch(getWeekWorkouts(deleteWorkout(props.workout)));
    });
  };

  const onDescriptionChange = e => {
    e.preventDefault();
    e.persist();
    setDescription(e.target.value)
    console.log(description);
  }

  return (
    <div>
      <p>{props.workout.exercise.name}</p>
      <form onSubmit={onUpdateDescription}>
        <label>
          Description:
          <input id='description' type="text" name="name" value={description} onChange={onDescriptionChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={onToggleCompletion}>{props.workout.completed ? "Completed" : "Incomplete"}</button>
      <button onClick={onDeleteWorkout}>Delete?</button>
    </div>
  );
};

export default WorkoutItem;
