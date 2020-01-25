// React specific imports
import React from "react";
import WorkoutItem from "./WorkoutItem";
import NewExerciseSelector from "./NewExerciseSelector";
import DayHeader from "./DayHeader";

// MUI imports
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import purple from '@material-ui/core/colors/purple';

// MUI JSS styling
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "1%",
    height: "100%",
    width: "14%",
    backgroundColor: purple['300']
  },
  paper: {
    height: "100%",
    marginTop: '4px',
    overflow: 'scroll',
    padding: '4%',
    backgroundColor: purple["100"]
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
    <Paper className={classes.root} variant="outlined">
      <DayHeader
        dayName={`${props.name} (${props.currentDate.month}/${props.currentDate.day})`}
      />
      <NewExerciseSelector currentDate={props.currentDate} user={props.user}/>
      <Paper className={classes.paper}>{createWorkoutItems()}</Paper>
    </Paper>
  );
};

export default DayCard;
