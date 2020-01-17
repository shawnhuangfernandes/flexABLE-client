import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { getWeekWorkouts } from "../redux/actionList";
import Calendar from "react-calendar";

// Planner Container taht holds Day Cards, and Calendar
const PlannerBodyContainer = props => {
  // redux state
  let workoutWeekSelected = useSelector(
    state => state.workoutReducer.selectedWeekWorkouts
  );

  // dispatch
  const dispatch = useDispatch();

  // calendar date formatter (for incoming JS Dates) goes here
  const dateJsFormatter = jsDate => {
    return {
      day: jsDate.getDate(),
      month: jsDate.getMonth() + 1,
      year: jsDate.getFullYear()
    };
  };

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split('-') // split the string date (e.g "2020-04-06") by dashes
    return {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      Day: parseInt(arr[2])
    }
  }

  // local state
  const [currentDate, setCurrentDate] = useState(dateJsFormatter(new Date()));

  // this method handles what happens when state changes (or when a re-render occurs)
  useEffect(() => {
    // api service to get the current users workouts grouped by day
    api.workouts
      .getCurrentWeekWorkouts({
        user_id: props.user.id,
        date: currentDate
      })
      .then(workoutsForWeek => {
        console.log(workoutsForWeek)
        dispatch(getWeekWorkouts(workoutsForWeek))}); // dispatch to change the days of the week selected
  }, [currentDate]); // ---- IMPORTANT NOTE, the brackets here prevent useEffect from running multiple times

  // mapping method that generates our DayCards goes here

  // event handler for calendar click
  const handleCalendarClick = dateSelected => {
    setCurrentDate(dateJsFormatter(dateSelected)); // set the current date
  };

  return (
    <div>
      <Calendar
        onChange={handleCalendarClick}
        value={
          new Date(currentDate.year, currentDate.month - 1, currentDate.day)
        }
        calendarType="US"
      />
    </div>
  );
};

export default PlannerBodyContainer;
