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
import { api } from "../services/api";
import Divider from "@material-ui/core/Divider";
import ExerciseDropdown from "./ExerciseDropdown";
import CheckIcon from "@material-ui/icons/Check";
import { ToggleButton } from "@material-ui/lab";

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

  const [workoutList, setWorkoutList] = useState(props.workoutData); // local state for list of workouts

  //EVENT HANDLER this method accesses backend to update a specific workout description
  const updateWorkoutEntry = e => {
    const workoutInfo = {
      // set the request body info (or backend params)
      id: e.target.id, // get the workout id
      description: e.target.value // set the workout description
    };

    api.workouts
      .updateWorkout(workoutInfo)
      .then(updatedWorkoutData => console.log(updatedWorkoutData));
  };

  // this method adds a new workout for the user on a specific date
  const addNewExercise = e => {
    const dateStringSplit = props.workoutData.date.split("-"); // need to split javascript date to array of strings to use in backend

    // set the body information for the request to the backend
    const workoutInfo = {
      exercise_id: parseInt(e.target.value),
      user_id: user.id,
      new_description: "",
      year: parseInt(dateStringSplit[0]),
      month: parseInt(dateStringSplit[1]),
      day: parseInt(dateStringSplit[2]),
    };

    api.workouts.createNewWorkout(workoutInfo).then(returnedWorkoutInfo => {
      setWorkoutList(addNewWorkoutToLocalState(returnedWorkoutInfo));
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
      .then(message => {
        setWorkoutList(deleteWorkoutFromLocalState(id))
      });
  };

  const deleteWorkoutFromLocalState = id => {
    let stateCopy = Object.assign({}, workoutList);
    stateCopy.day_workout_info = stateCopy.day_workout_info.filter(exercise => {
      return exercise.workout.id !== id;
    });
    return stateCopy;
  };

    //EVENT HANDLER this method accesses backend to update a specific workout description
    const toggleWorkoutComplete = (e, workout) => {
      const workoutInfo = {
        // set the request body info (or backend params)
        id: workout.id, // get the workout id
        completed: !workout.completed // toggle the workout complete status
      };
  
      api.workouts // pass it to the api
        .updateWorkout(workoutInfo)
        .then(updatedWorkoutData => setWorkoutList(updateWorkoutCompletionToLocalState(updatedWorkoutData)));
    };

    const updateWorkoutCompletionToLocalState = updatedWorkoutInfo => { // REFACTOR
      let stateCopy = Object.assign({}, workoutList);
      stateCopy.day_workout_info.map(workout => {
        if (workout.workout.id === updatedWorkoutInfo.id) {
          return updatedWorkoutInfo
        }
        else {
          return workout
        }
      })
      return stateCopy;
    };

  // this method takes a list of exercises from a specific day and generates Typography (MUI) components for use in the render method
  const listOutExercises = workoutList => {
    if (workoutList.day_workout_info.length > 0) {
      // if we have workouts durrent the current day
      const workoutArrayToJSX = workoutList.day_workout_info.map(dayWorkout => {
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
                    <ToggleButton
                      size="small"
                      value="check"
                      selected={dayWorkout.workout.completed}
                      onClick={e =>
                        toggleWorkoutComplete(e, dayWorkout.workout)
                      }
                    >
                      <CheckIcon />
                    </ToggleButton>
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
        <Typography variant="h5">{`${
          props.dayOfTheWeek
        } - (${props.workoutData.date
          .substring(5)
          .replace("0", "")
          .replace("-", "/")})`}</Typography>
        <Divider />
        {listOutExercises(workoutList)}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
