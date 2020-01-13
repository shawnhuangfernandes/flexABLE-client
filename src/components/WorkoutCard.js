import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { api } from "../services/api";

// use styles for MUI components
const useStyles = makeStyles(theme => ({
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
    marginBottom: 0
  },
  cardContent: {
    height: "85%"
  }
}));

// renders the Workout card that contains information for exactly one day of workouts
export const WorkoutCard = props => {

  const classes = useStyles(); // use the styles from above

  const saveExerciseEntry = e => {
    const workoutInfo = {
      workout_id: e.target.id,
      newDescription: e.target.value
    };

    api.workouts.updateWorkoutDescription(workoutInfo)
    .then(updatedWorkoutData => console.log(updatedWorkoutData))

  };

  // this method takes a list of exercises from a specific day and generates Typography (MUI) components for use in the render method
  const listOutExercises = dayData => {
    if (dayData.day_workout_info.length > 0) {
      const workoutArrayToJSX = dayData.day_workout_info.map(dayWorkout => {
        return (
          <div key={Math.random()}>
            <Typography className={classes.pos} color="textSecondary">
              {dayWorkout.exercise_name}
            </Typography>
            <TextField
              onBlur={saveExerciseEntry}
              className={classes.margin}
              id={dayWorkout.workout.id.toString()}
              fullWidth
              placeholder="Enter Description"
              defaultValue={
                dayWorkout.workout.description
                  ? dayWorkout.workout.description
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FitnessCenterIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        );
      });

      return workoutArrayToJSX;
    }
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{props.workoutData.date}</Typography>
        {listOutExercises(props.workoutData)}
      </CardContent>
      <CardActions>
        <Grid container direction="row">
          <Button size="small">Add New</Button>
          <Button size="small">Clear</Button>
        </Grid>
      </CardActions>
    </Card>
  );
};
