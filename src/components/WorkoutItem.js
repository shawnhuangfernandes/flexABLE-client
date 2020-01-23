// React specific imports
import React, { useState } from "react";
import { api } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getWeekWorkouts } from "../redux/actionList";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";
import grey from '@material-ui/core/colors/grey';

// JSS Styling
const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    paddingRight: "4px",
    marginBottom: "4px",
    backgroundColor: grey['300']
  },
  cardHeader: {
    padding: "6px",
    textAlign: "center"
  },
  button: {
    padding: "0px"
  },
  title: {
    color: "red",
    fontSize: 14
  }
}));

// This is the workout item that displays a specific workout with a delete button, description, and complete button
const WorkoutItem = props => {
  const dispatch = useDispatch(); // allow this component to change redux state
  const week = useSelector(state => state.workoutReducer.selectedWeekWorkouts); // get redux state for the selected week
  const classes = useStyles();

  const [description, setDescription] = useState(props.workout.description); // local state for description on text field

  // this method returns the new version of the week after a specific workout has been updated
  const updateWorkoutList = updatedWorkout => {
    // map through the week, and find the day which the updated workout resides, and update the entry
    const updatedWeek = week.map(day => {
      return day.map(workout => {
        return workout.id !== updatedWorkout.id ? workout : updatedWorkout;
      });
    });

    return updatedWeek;
  };

  // this method returns the new version of the week after a specific workout has been updated
  const deleteWorkout = workoutToDelete => {
    // map through the week, and find the day which the updated workout resides, and update the entry
    const updatedWeek = week.map(day => {
      return day.filter(workout => {
        return workout.id !== workoutToDelete.id;
      });
    });

    return updatedWeek;
  };

  // EVENT HANDLER: when button for completion is clicked
  const onToggleCompletion = e => {
    e.persist();
    // run api service to update the workout with the toggled completion status
    api.workouts
      .updateWorkout({
        ...props.workout,
        completed: !props.workout.completed
      })
      .then(
        updatedWorkout =>
          dispatch(getWeekWorkouts(updateWorkoutList(updatedWorkout))) // dispatch the UPDATED WORKOUT LIST
      );
  };

  // EVENT HANDLER: when description is officially updated
  const onUpdateDescription = () => {
    // e.preventDefault();
    // e.persist();

    api.workouts
      .updateWorkout({
        ...props.workout,
        description: description
      })
      .then(
        updatedWorkout =>
          dispatch(getWeekWorkouts(updateWorkoutList(updatedWorkout))) // dispatch the UPDATED WORKOUT LIST
      );
  };

  // EVENT HANDLER: when workout item delete button is clicked
  const onDeleteWorkout = e => {
    api.workouts.deleteWorkout(props.workout).then(message => {
      dispatch(getWeekWorkouts(deleteWorkout(props.workout)));
    });
  };

  // EVENT HANDLER: when description text field is typed in
  const onDescriptionChange = e => {
    e.persist();
    if (e.nativeEvent.inputType !== "insertLineBreak") {
      setDescription(e.target.value);
    } else {
      onUpdateDescription();
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title
        }}
        className={classes.cardHeader}
        avatar={
          <Checkbox
            checked={props.workout.completed}
            onChange={onToggleCompletion}
            value="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        action={
          <IconButton className="boogie" onClick={onDeleteWorkout}>
            <DeleteForeverIcon className={classes.button} fontSize="large" />
          </IconButton>
        }
        title={props.workout.exercise.name}
      />
      <CardContent>
        <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          rowsMax="4"
          value={description}
          onChange={onDescriptionChange}
          // onKeyPress={onUpdateDescription}
        />
      </CardContent>
    </Card>
  );
};

export default WorkoutItem;
