import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate } from "../redux/actionList";
import { api } from "../services/api";
import Grid from "@material-ui/core/Grid";
import WorkoutCard from "./WorkoutCard";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  // theming for the components rendered in the Dashboard Body
  root: {
    display: "flex", // make the root container a flex box
    minHeight: "100vh"
  }
}));

// Renders the Planner Section of FlexABLE
const PlannerBodyContainer = () => {
  const classes = useStyles(); // rename the styles object as classes
  const dispatch = useDispatch(); // dispatch for settings Redux State
  const user = useSelector(state => state.authReducer.user);

  // method for when a day on the Calendar is clicked
  const onSetDate = date => {
    dispatch(setCurrentDate(date)); // set Redux state to the selected date

    const dateInfo = {
      user_id: user.id, // get user from state
      day: date.getDate(), // get the day
      month: date.getMonth() + 1, // Javascript get month is indexed at [0-11], but ruby is indexed at [1-12]
      year: date.getFullYear() // get the year
    };

    api.workouts
      .getCurrentWeekWorkouts(dateInfo)
      .then(workoutsData => generateWeeklyWorkoutCards(workoutsData));
  };

  const generateWeeklyWorkoutCards = workoutsData => {
    return workoutsData.map(workout => {
      console.log(workout);
      return workout;
    });
  };

  // After Planner Body Component Mounts On Page
  useEffect(() => {
    onSetDate(new Date());
    // eslint-disable-next-line
  }, [user]);

  // Returns the Calendar which starts on today's date
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className="planning-body-container"
      >
        <Grid item xs={4}>
          <Calendar
            onClickDay={onSetDate}
            activeStartDate={new Date()}
            value={new Date()}
            calendarType="US"
          />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          classname="week-view"
          spacing={2}
        >
          <Grid
            container
            item
            spacing={0}
            direction="column"
            classname="calendar-first-four"
          >
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={0}
            direction="column"
            classname="calendar-second-four"
          >
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
            <Grid item xs={1}>
              <WorkoutCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlannerBodyContainer;
