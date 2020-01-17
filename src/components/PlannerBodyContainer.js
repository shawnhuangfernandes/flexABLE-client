import React, { useEffect, useState } from 'react';
import { api } from '../services/api'
import { useSelector } from 'react-redux'
import { setCurrentDate } from '../redux/actionList';
const PlannerBodyContainer = () => {

  // redux state
  let workoutWeekSelected = useSelector(state => state.workoutReducer.selectedWeekWorkouts) // selected week's workouts
  let exerciseList = useSelector(state => state.exerciseReducer.exercises) // available exercises

  // calendar date formatter (Ruby to JS) goes here
  const dateJsFormatter = jsDate => {
    return {
      day: jsDate.getDate(),
      month: jsDate.getMonth() + 1,
      year: jsDate.getFullYear()
    }
  }

  // local state
  const [currentDate, setCurrentDate] = useState(dateJsFormatter(new Date()))

  useEffect(() => {
    console.log(currentDate)
    // let's get our exercises and store them in state
    // lets get our workouts for this calendarweek an also store them in state
  });

  

  // calendar date formatter (JS to Ruby) goes here
  const dateRbFormatter = RbDate => {

  }
  
  // mapping method that generates our DayCards goes here



  
  return (
    <div>
      
    </div>
  );
};

export default PlannerBodyContainer;