import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { api } from "../services/api";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 185
  }
}));

// renders the Workout card that contains information for exactly one day of workouts
export const WorkoutCard = props => {
  const classes = useStyles(); // use the styles from above
  const exercises = useSelector(state => state.exerciseReducer.exercises);
  const user = useSelector(state => state.authReducer.user);

  const updateExerciseEntry = e => {
    const workoutInfo = {
      id: e.target.id,
      new_description: e.target.value
    };

    api.workouts
      .updateWorkoutDescription(workoutInfo)
      .then(updatedWorkoutData => console.log(updatedWorkoutData));
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
              onBlur={updateExerciseEntry}
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

      const addNewExercise = e => {
        console.log(e.target.value); // gets me the id of the exercise
        console.log(typeof props.workoutData.date);
        console.log(user.id);
        const dateStringSplit = props.workoutData.date.split('-')

        console.log(dateStringSplit)
        const workoutInfo = {
          id: e.target.value,
          new_description: "",
          
          user_id: user.id
        };
      };

      const getExerciseOptions = () => {
        const exerciseOptions = exercises.map(exercise => {
          return (
            <option value={exercise.id} key={Math.random()}>
              {exercise.name}
            </option>
          );
        });

        return exerciseOptions;
      };

      return (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">
              Add Exercise
            </InputLabel>
            <Select
              native
              defaultValue=""
              input={<Input id="grouped-native-select" />}
              onChange={addNewExercise}
            >
              <option value="" />
              {/* <optgroup label="Category 1">
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
              </optgroup> */}
              <optgroup label="Exercises">{getExerciseOptions()}</optgroup>
            </Select>
          </FormControl>
          {workoutArrayToJSX}
        </>
      );
    }
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{props.workoutData.date}</Typography>
        {listOutExercises(props.workoutData)}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
