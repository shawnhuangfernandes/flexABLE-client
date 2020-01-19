// React specific imports
import React from "react";
import WorkoutItem from "./WorkoutItem";
import NewExerciseSelector from "./NewExerciseSelector";

// MUI imports
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: '1%',
    height: '100%',  
    overflowY: 'scroll'
  }
}));

const DayCard = props => {
  const classes = useStyles();

  // this method renders a WorkoutItem for each workout passed via props for the day
  const createWorkoutItems = () => {
    return props.workouts.map(workout => {
      return <WorkoutItem workout={workout} key={Math.random()} />;
    });
  };

  return (
    <Paper className={classes.root} variant="outlined" >
      <p>{props.name}</p>
      <p>
        {props.currentDate.month} - {props.currentDate.day}
      </p>
      {createWorkoutItems()}
      <NewExerciseSelector currentDate={props.currentDate} />
    </Paper>
  );
};

export default DayCard;
