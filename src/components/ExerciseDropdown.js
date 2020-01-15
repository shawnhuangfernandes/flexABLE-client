import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 185
  }
}));

const ExerciseDropdown = props => {
  const classes = useStyles();
  const exercises = Object.values(
    useSelector(state => state.exerciseReducer.exercises)
  );

  // get the exercise options from redux state and map them to options for the dropdown
  const getExerciseOptions = (category) => {
    const exerciseOptions = exercises.filter(exercise => 
      exercise.category === category
    ).map(exercise => {
      return (
        <option value={exercise.id} key={Math.random()}>
          {exercise.name}
        </option>
      );
    });

    return <optgroup label={category}>{exerciseOptions}</optgroup>;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-native-select">Add Exercise</InputLabel>
      <Select
        native
        defaultValue=""
        input={<Input id="grouped-native-select" />}
        onChange={props.handleChange}
      >
        <option value="" />
        {getExerciseOptions("Arms")}
        {getExerciseOptions("Abs")}
        {getExerciseOptions("Back")}
        {getExerciseOptions("Chest")}
        {getExerciseOptions("Compound")}
        {getExerciseOptions("Cardio")}
        {getExerciseOptions("Hips")}
        {getExerciseOptions("Legs")}
        {getExerciseOptions("Shoulders")}
        {getExerciseOptions("Activity")}
      </Select>
    </FormControl>
  );
};

export default ExerciseDropdown;
