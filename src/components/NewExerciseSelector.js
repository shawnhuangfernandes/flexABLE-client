// React imports
import React, { useState,} from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../services/api";
import { getWeekWorkouts} from "../redux/actionList";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";

// JSS styling
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
    maxHeight: "200px"
  },
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  inputHolder: {
    width: "100%"
  }
}));

const NewExerciseSelector = props => {
  const classes = useStyles(); // use JSS styles

  const user = useSelector(state => state.authReducer.user); // redux state to grab logged in user
  const exercises = useSelector(state => state.exerciseReducer.exercises); // redux state to grab exercises for drop down
  const week = useSelector(state => state.workoutReducer.selectedWeekWorkouts); // get redux state for the selected week

  const [exerciseId, setExerciseId] = useState(null); // local state for exercise id from drop down selection
  const [description, setDescription] = useState(""); // local state for description on text field

  const dispatch = useDispatch(); // dispatch for updating redux state


  // EVENT HANDLER: when description text field is typed in
  const onDescriptionChange = e => {
    e.persist();
    setDescription(e.target.value);
  };

  // EVENT HANDLER: when form is submitted to create a new workout
  const onCreateWorkout = e => {
    e.preventDefault();
    e.persist();

    if (exerciseId !== null) {
      const workoutInfo = {
        user_id: user.id,
        exercise_id: exerciseId,
        completed: false,
        description: description,
        workout_date: new Date(
          props.currentDate.year,
          props.currentDate.month - 1,
          props.currentDate.day
        )
      };

      api.workouts.createNewWorkout(workoutInfo).then(workout => {
        dispatch(getWeekWorkouts(addNewWorkout(workout)));
      });
    }
  };

  // EVENT HANDLER: when a drop down option is selected
  const onSelectExercise = e => {
    e.persist();
    setExerciseId(e.target.value);
  };

  // this method updates the current redux state by adding a new workout to the appropriate day of the week
  const addNewWorkout = workout => {
    const dayOfTheWeek = dateRbFormatter(workout.workout_date).getDay();
    const returnedCopy = [...week];
    returnedCopy[dayOfTheWeek].push(workout);
    return returnedCopy;
  };

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
  };

  // this maps the exercises to options for the drop down
  const getExerciseOptions = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel>Add Exercise</InputLabel>
        <Select
          autoWidth
          onChange={onSelectExercise}
          defaultValue={999}
          input={<Input />}
        >
          <MenuItem value={999}>
            <em>Choose Exercise</em>
          </MenuItem>
          <ListSubheader>Arms</ListSubheader>
          {getMenuItems("Arms")}
          <ListSubheader>Chest</ListSubheader>
          {getMenuItems("Chest")}
          <ListSubheader>Legs</ListSubheader>
          {getMenuItems("Legs")}
          <ListSubheader>Back</ListSubheader>
          {getMenuItems("Back")}
          <ListSubheader>Shoulders</ListSubheader>
          {getMenuItems("Shoulders")}
          <ListSubheader>Hips</ListSubheader>
          {getMenuItems("Hips")}
          <ListSubheader>Cardio</ListSubheader>
          {getMenuItems("Cardio")}
          <ListSubheader>Compound</ListSubheader>
          {getMenuItems("Compound")}
          <ListSubheader>Activity</ListSubheader>
          {getMenuItems("Activity")}
        </Select>
      </FormControl>
    );
  };

  const getMenuItems = category => {
    return exercises
      .filter(exercise => {
        return exercise.category === category;
      })
      .map(exercise => {
        return (
          <MenuItem key={Math.random()} value={exercise.id}>
            {exercise.name}
          </MenuItem>
        );
      });
  };

  return (
    <Paper component="form" className={classes.root}>
      <Box
        className={classes.inputHolder}
        display="flex"
        flexDirection="column"
      >
        {getExerciseOptions()}
        <Box display="flex" flexDirection="row">
          <InputBase
            className={classes.input}
            placeholder="Workout Details"
            onChange={onDescriptionChange}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            onClick={onCreateWorkout}
          >
            <AddBoxIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewExerciseSelector;
