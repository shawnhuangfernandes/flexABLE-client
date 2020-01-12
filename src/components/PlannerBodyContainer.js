import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate } from "../redux/actionList";
import { api } from "../services/api";
import Grid from "@material-ui/core/Grid";
import WorkoutCard from "./WorkoutCard";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  // theming for the components rendered in the Dashboard Body
  root: {
    display: "flex", // make the root container a flex box
    minHeight: "88vh"
  },
  plannerCalBox: {
    minWidth: "100%",
  },
  plannerRow: {
    height: "50%"
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

  // Adds a workout on a specific date
  const addWorkout = (e) => {
    // grab the event, get the date
    // bring up a modal that asks the user what exercise they'd like to add & an optional SHORT description
  }

  // Returns the Calendar which starts on today's date
  return (
    <div className={classes.root}>
      <Grid
        xs={12}
        container
        direction="column"
        alignItems="center"
        className="planning-body-container"
      >
        <Grid item xs={4} className={classes.plannerCalBox} >
          <Calendar
            onClickDay={onSetDate}
            activeStartDate={new Date()}
            value={new Date()}
            calendarType="US"
          />
        </Grid>
        <Grid item xs={8} className={classes.plannerCalBox}>
          <Grid xs={12} container className={classes.plannerRow}>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>
                
              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
          </Grid>
          <Grid xs={12} container className={classes.plannerRow}>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
            <Grid item container xs={3} onClick={addWorkout}>
              <Paper variant="outlined" square>

              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlannerBodyContainer;
