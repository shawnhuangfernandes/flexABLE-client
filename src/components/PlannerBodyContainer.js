import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate, getWeekWorkouts, setExerciseList } from "../redux/actionList";
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
  const workouts = useSelector(
    state => state.workoutReducer.selectedWeeksWorkouts
  );

  // After Planner Body Component Mounts On Page
  useEffect(() => {
    onSetDate(new Date());
    api.exercises.getAllExercises()
    .then(exercises => dispatch(setExerciseList(exercises)))
    // eslint-disable-next-line
  }, [user]);

  // method for when a day on the Calendar is clicked
  const onSetDate = date => {
    
    const stringifiedDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate())).slice(-2)}`

    dispatch(setCurrentDate(stringifiedDate)); // set Redux state to the selected date


    const dateInfo = {
      user_id: user.id, // get user from state
      day: date.getDate(), // get the day
      month: date.getMonth() + 1, // Javascript get month is indexed at [0-11], but ruby is indexed at [1-12]
      year: date.getFullYear() // get the year
    };

    api.workouts // api service for getting the weeks workouts
      .getCurrentWeekWorkouts(dateInfo)
      .then(workoutsData => dispatch(getWeekWorkouts(workoutsData)));
  };

  // workouts redux state used here
  const generateWeeklyWorkoutCards = (startingDOW, endingDOW) => {
    // helper method that generates a workouts from a starting day of week to ending day of week
    const partialWeekWorkoutArray = []; // create an empty container array
    if (workouts.length !== undefined) {
      // if the STATE workouts array HAS BEEN defined
      for (let i = startingDOW; i < endingDOW; i++) {
        // go from the starting day of the week to the ending day of the week
        partialWeekWorkoutArray.push(
          // push a new Grid item with a nested workout card (with props of the workout data of that day of week)
          <Grid
            item
            container
            xs={3}
            key={Math.random()}
          >
            <WorkoutCard workoutData={workouts[i]}/>
          </Grid>
        );
      }
    }
    return partialWeekWorkoutArray; // return the partial list of workouts between the specified days of the week
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
            calendarType="US"
          />
        </Grid>
        <Grid item xs={8} className={classes.plannerCalBox}>
          <Grid container className={classes.plannerRow}>
            {generateWeeklyWorkoutCards(0, 4)}
          </Grid>
          <Grid container className={classes.plannerRow}>
            {generateWeeklyWorkoutCards(4, 7)}
            
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlannerBodyContainer;
