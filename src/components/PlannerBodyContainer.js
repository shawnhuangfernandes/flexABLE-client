import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { getWeekWorkouts, signIn } from "../redux/actionList";
import Calendar from "react-calendar";
import WeekGrid from "./WeekGrid";

// Planner Container taht holds Day Cards, and Calendar
const PlannerBodyContainer = props => {
  // calendar date formatter (for incoming JS Dates) goes here
  const dateJsFormatter = jsDate => {
    return {
      day: jsDate.getDate(),
      month: jsDate.getMonth() + 1,
      year: jsDate.getFullYear()
    };
  };

  // local state
  const [currentDate, setCurrentDate] = useState(dateJsFormatter(new Date()));

  // redux state
  let selectedWeekWorkouts = useSelector(
    state => state.workoutReducer.selectedWeekWorkouts
  );

  const user = useSelector(state => state.authReducer.user);

  // dispatch
  const dispatch = useDispatch();

  // this method handles what happens when state changes (or when a re-render occurs)
  useEffect(() => {
    // api service to get the current users workouts grouped by day
    api.workouts
      .getCurrentWeekWorkouts({
        user_id: user.id,
        date: currentDate
      })
      .then(workoutsForWeek => {
        dispatch(getWeekWorkouts(workoutsForWeek)); // dispatch to change the days of the week selected
      });
  }, [currentDate]); // ---- IMPORTANT NOTE, the brackets here prevent useEffect from running multiple times

  // event handler for calendar click
  const handleCalendarClick = dateSelected => {
    setCurrentDate(dateJsFormatter(dateSelected)); // set the current date
  };

  // gets the first day of the week
  const firstDayOfWeek = () => {
    const today = new Date(
      currentDate.year,
      currentDate.month - 1,
      currentDate.day
    );
    const dayOfTheWeek = today.getDay();

    today.setDate(today.getDate() - dayOfTheWeek);
    return today;
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
      <WeekGrid
        firstDayOfWeek={firstDayOfWeek()}
        currentDate={currentDate}
        weekWorkouts={selectedWeekWorkouts}
        dateJsFormatter={dateJsFormatter}
      />
    </div>
  );
};

export default PlannerBodyContainer;
