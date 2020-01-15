import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { api } from "../services/api";

import ExerciseDropdown from "./ExerciseDropdown";

// use styles for MUI components
const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "100%",
    overflow: "auto"
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
    height: "300px",
    overflow: "clipped"
  }
}));

// renders the Workout card that contains information for exactly one day of workouts
export const WorkoutCard = props => {
  const classes = useStyles(); // use the styles from above

  const user = useSelector(state => state.authReducer.user); // get auth'd user info from redux state

  const [workoutList, setWorkoutList] = useState(props.workoutData);

  //EVENT HANDLER this method accesses backend to update a specific workout description
  const updateWorkoutEntry = e => {
    const workoutInfo = {
      // set the request body info (or backend params)
      id: e.target.id, // get the workout id
      new_description: e.target.value // set the workout description
    };

    api.workouts
      .updateWorkoutDescription(workoutInfo)
      .then(updatedWorkoutData => console.log(updatedWorkoutData));
  };

  // this method adds a new workout for the user on a specific date
  const addNewExercise = e => {
    const dateStringSplit = props.workoutData.date.split("-"); // need to split javascript date to array of strings to use in backend

    // set the body information for the request to the backend
    const workoutInfo = {
      exercise_id: parseInt(e.target.value),
      new_description: "",
      year: parseInt(dateStringSplit[0]),
      month: parseInt(dateStringSplit[1]),
      day: parseInt(dateStringSplit[2]),
      user_id: user.id
    };

    api.workouts.createNewWorkout(workoutInfo).then(workoutInfo => {
      setWorkoutList(addNewWorkoutToLocalState(workoutInfo));
    });
  };

  const addNewWorkoutToLocalState = workoutInfo => {
    let stateCopy = Object.assign({}, workoutList);
    stateCopy.day_workout_info.push(workoutInfo);
    return stateCopy;
  };

  const deleteWorkoutFromCard = (e, id) => {
    api.workouts
      .deleteWorkout(id)
      .then(message => setWorkoutList(deleteWorkoutFromLocalState(id)));
  };


  const deleteWorkoutFromLocalState = id => {
    
    let stateCopy = Object.assign({}, workoutList);
    stateCopy.day_workout_info = stateCopy.day_workout_info.filter(exercise => {
      return exercise.workout.id !== id;
    });
    return stateCopy;
  };

  // this method takes a list of exercises from a specific day and generates Typography (MUI) components for use in the render method
  const listOutExercises = dayData => {
    if (dayData.day_workout_info.length > 0) {
      // if we have workouts durrent the current day
      const workoutArrayToJSX = dayData.day_workout_info.map(dayWorkout => {
        // go through the array of workouts and for each set of exercises
        return (
          // return a label and text field for the exercise name and description
          <div key={Math.random()}>
            <Typography className={classes.pos} color="textSecondary">
              {dayWorkout.exercise_name}
            </Typography>
            <TextField
              onBlur={updateWorkoutEntry}
              className={classes.margin}
              id={dayWorkout.workout.id.toString()}
              placeholder="Enter Description"
              defaultValue={
                dayWorkout.workout.description
                  ? dayWorkout.workout.description
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="delete"
                      onClick={e =>
                        deleteWorkoutFromCard(e, dayWorkout.workout.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        );
      });

      return (
        <>
          <ExerciseDropdown handleChange={addNewExercise} />
          {workoutArrayToJSX}
        </>
      );
    } else {
      return (
        <>
          <ExerciseDropdown handleChange={addNewExercise} />
        </>
      );
    }
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{props.workoutData.date}</Typography>
        {listOutExercises(workoutList)}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
