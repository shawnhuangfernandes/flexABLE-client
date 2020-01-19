import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../services/api";

const NewExerciseSelector = props => {
  const user = useSelector(state => state.authReducer.user);
  const exercises = useSelector(state => state.exerciseReducer.exercises);

  const [exerciseId, setExerciseId] = useState(1);
  const [description, setDescription] = useState(""); // local state for description on text field

  // EVENT HANDLER: when description text field is typed in
  const onDescriptionChange = e => {
    e.persist();
    setDescription(e.target.value);
  };

  const onCreateWorkout = e => {
      e.preventDefault();

      const workoutInfo = {
          user_id: user.id,
          exercise_id: exerciseId,
          year: props.currentDate.year,
          month: props.currentDate.month,
            day: props.currentDate.day,
            completed: false,
            description: description,
            workout_date: new Date(props.currentDate.year, props.currentDate.month - 1, props.currentDate.day),
      }

      api.workouts.createNewWorkout(workoutInfo)
      .then(workout => console.log(workout))
  }

  const onSelectExercise = e => {
      e.persist();
      setExerciseId(e.target.value);
  }

  const getExerciseOptions = () => {
    return <select onChange={onSelectExercise} value={exerciseId}>
        {
            exercises.map(exercise => {
                return <option key={Math.random()} value={exercise.id}>{exercise.name}</option>
            })
        }
    </select>
  }

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
