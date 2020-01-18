import React from 'react';
import { api } from '../services/api'
import { useDispatch } from 'react-redux'

// This is the workout item that displays a specific workout with a delete button, description, and complete button
const WorkoutItem = props => {

    const dispatch = useDispatch(); // allow this component to change redux state

    const toggleCompletion = (e) => {

        // run api service to update the workout with the toggled completion status
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