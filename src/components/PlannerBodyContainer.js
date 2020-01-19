// REACT specific imports
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { getWeekWorkouts } from "../redux/actionList";
import Calendar from "react-calendar";
import WeekGrid from "./WeekGrid";

// MUI imports
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

// Planner Container taht holds Day Cards, and Calendar
const PlannerBodyContainer = props => {
  const classes = useStyles(); // use MUI styling local to this component

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

  // get the user from state
  const user = useSelector(state => state.authReducer.user);

  // dispatch
  const dispatch = useDispatch();

  // this method handles what happens when state changes (or when a re-render occurs)
  useEffect(() => {
    // api service to get the current users workouts grouped by day
    api.workouts.getWorkouts(user).then(allWorkouts => {
      const workoutsForWeek = getWorkoutsForWeek(allWorkouts);
      dispatch(getWeekWorkouts(workoutsForWeek)); // dispatch to change the days of the week selected
    });
  }, [currentDate, user, dispatch, getWeekWorkouts]); // ---- IMPORTANT NOTE, the brackets here prevent useEffect from running multiple times

  // event handler for calendar click
  const handleCalendarClick = dateSelected => {
    setCurrentDate(dateJsFormatter(dateSelected)); // set the current date
  };

  // gets the workouts for the week
  const getWorkoutsForWeek = workoutList => {
    const weekWorkouts = new Array([], [], [], [], [], [], []);
    const jsCurrentDate = simpleDateFormatter(currentDate);
    const dayOfTheWeek = jsCurrentDate.getDay();
    jsCurrentDate.setDate(jsCurrentDate.getDate() - dayOfTheWeek);

    const workoutWeekInfo = weekWorkouts.map(workouts => {
      const filteredWorkouts = workoutList.filter(workout => {
        const workoutDate = dateRbFormatter(workout.workout_date);
        return (
          workoutDate.getDate() === jsCurrentDate.getDate() &&
          workoutDate.getMonth() === jsCurrentDate.getMonth() &&
          workoutDate.getFullYear() === jsCurrentDate.getFullYear()
        );
      });
      jsCurrentDate.setDate(jsCurrentDate.getDate() + 1);
      return filteredWorkouts;
    });

    return workoutWeekInfo;
  };

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
  };

  // calendar date formatter (for incoming JS Dates) goes here
  const simpleDateFormatter = simpleDate => {
    return new Date(simpleDate.year, simpleDate.month - 1, simpleDate.day);
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
    <div className={classes.root}>
      
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
