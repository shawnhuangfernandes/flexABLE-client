import React, { useEffect } from 'react';
import { api } from '../services/api'
import { useSelector } from 'react-redux'
const PlannerBodyContainer = () => {

  let workoutWeekSelected = useSelector(state => state.workoutReducer.selectedWeekWorkouts) // set up our redux state for the selected week's workouts
  let exerciseList = useSelector(state => state.exerciseReducer.exercises) // set up our redux state for the available exercises

  useEffect(() => {
    console.log(exerciseList);
    // let's get our exercises and store them in state
    // the date to today (in JS)
    // lets get our workouts for this calendarweek an also store them in state
  });

  // calendar date formatter (Ruby to JS) goes here


  // calendar date formatter (JS to Ruby) goes here

  
  // mapping method that generates our DayCards goes here



  
  return (
    <div>
      
    </div>
  );
};

export default PlannerBodyContainer;