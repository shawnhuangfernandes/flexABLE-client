import React from 'react';
import { api } from '../services/api'
const WorkoutItem = props => {

    const toggleCompletion = (e) => {
        // run the api service to update this specific workout
        // spit out the new updated workout

        api.workouts.updateWorkout({
            ...props.workout,
            completed: !props.workout.completed
        })
        .then(updatedWorkout => {
            console.log(updatedWorkout);
        })
    }

    return (
        <div>
            <p>{props.workout.exercise.name}</p>
            <p>{props.workout.completed ? "Completed" : "Incomplete"}</p>
            <button onClick={toggleCompletion}>Complete?</button>
        </div>
    );
};

export default WorkoutItem;