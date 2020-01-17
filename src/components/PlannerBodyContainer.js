import React, { useEffect, useState } from 'react';
import { api } from '../services/api'
import { useSelector } from 'react-redux'
import { setCurrentDate } from '../redux/actionList';
const PlannerBodyContainer = props => {

  // redux state
  let workoutWeekSelected = useSelector(state => state.workoutReducer.selectedWeekWorkouts) // selected week's workouts

  // calendar date formatter (for incoming JS Dates) goes here
  const dateJsFormatter = jsDate => {
    return {
      day: jsDate.getDate(),
      month: jsDate.getMonth() + 1,
      year: jsDate.getFullYear()
    }
  }

  // local state
  const [currentDate, setCurrentDate] = useState(dateJsFormatter(new Date()))

  
  // this method 
  useEffect(() => {
    // api service to get the current users workouts grouped by day
  api.workouts.getCurrentWeekWorkouts(
    {
      user_id: props.user.id,
      date: currentDate
    }
  ).then(workoutsForWeek => console.log(workoutsForWeek))
  }); // ---- IMPORTANT NOTE, the brackets here prevent useEffect from running multiple times

  

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