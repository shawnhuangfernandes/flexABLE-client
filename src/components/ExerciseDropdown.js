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
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-native-select">Add Exercise</InputLabel>
      <Select
        native
        defaultValue=""
        input={<Input id="grouped-native-select" />}
        onChange={props.handleChange}
      >
        <option value="" />
        {/* <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup> */}
        <optgroup label="Exercises">{getExerciseOptions()}</optgroup>
      </Select>
    </FormControl>
  );
};

export default ExerciseDropdown;
