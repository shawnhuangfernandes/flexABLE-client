import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate, getWeekWorkouts } from "../redux/actionList";
import { api } from "../services/api";
import Grid from "@material-ui/core/Grid";
import { WorkoutCard } from "./WorkoutCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  // theming for the components rendered in the Dashboard Body
  root: {
    display: "flex", // make the root container a flex box
    minHeight: "88vh"
  },
  plannerCalBox: {
    minWidth: "100%"
  },
  plannerRow: {
    height: "50%"
  },
  card: {
    minWidth: "100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

// Renders the Planner Section of FlexABLE
const PlannerBodyContainer = () => {
  const classes = useStyles(); // rename the styles object as classes
  const dispatch = useDispatch(); // dispatch for settings Redux State
  const user = useSelector(state => state.authReducer.user);

  // After Planner Body Component Mounts On Page
  useEffect(() => {
    onSetDate(new Date());
    // eslint-disable-next-line
  }, [user]);

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
        .then(workoutsData => dispatch(getWeekWorkouts(workoutsData)));
    };
  
    const generateWeeklyWorkoutCards = workoutsData => {
      const weekWorkout = workoutsData.map(currentDayExerciseData => {
        return <WorkoutCard key={Math.random()} currentDayExerciseData={currentDayExerciseData}/>
      });


      

    };

  // Adds a workout on a specific date
  const addWorkoutToDay = e => {
    // grab the event, get the date
    // bring up a modal that asks the user what exercise they'd like to add & an optional SHORT description
  };

  // Returns the Calendar which starts on today's date
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className="planning-body-container"
      >
        <Grid item xs={4} className={classes.plannerCalBox}>
          <Calendar
            onClickDay={onSetDate}
            activeStartDate={new Date()}
            value={new Date()}
            calendarType="US"
          />
        </Grid>
        <Grid item xs={8} className={classes.plannerCalBox}>
          <Grid container className={classes.plannerRow}>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
          </Grid>
          <Grid container className={classes.plannerRow}>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
            <Grid item container xs={3} onClick={addWorkoutToDay}>
              <WorkoutCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlannerBodyContainer;
