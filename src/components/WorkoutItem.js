import React from 'react';
import { api } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { getWeekWorkouts } from "../redux/actionList";

// This is the workout item that displays a specific workout with a delete button, description, and complete button
const WorkoutItem = props => {

    const dispatch = useDispatch(); // allow this component to change redux state
    const week = useSelector(state => state.workoutReducer.selectedWeekWorkouts) // get redux state for the selected week

    // this method returns the new version of the week after a specific workout has been updated
    const updateWorkoutList = updatedWorkout => {

        // map through the week, and find the day which the updated workout resides, and update the entry
        const updatedWeek = week.map(day => {
            if(day[0].workout_date === updatedWorkout.workout_date){
                return day.map(workout => {
                    return workout.id !== updatedWorkout.id ? workout : updatedWorkout
                })
            }
            else
            {
                return day
            }  
        })

        return updatedWeek
    }

    const toggleCompletion = (e) => {

        // run api service to update the workout with the toggled completion status
        api.workouts.updateWorkout({
            ...props.workout,
            completed: !props.workout.completed
        })
        .then(updatedWorkout => 
            dispatch(getWeekWorkouts(updateWorkoutList(updatedWorkout))) // dispatch the UPDATED WORKOUT LIST
        )
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