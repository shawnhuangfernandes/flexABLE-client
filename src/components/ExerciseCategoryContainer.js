// React specific imports
import React from 'react';
import ExerciseCard from './ExerciseCard'

// MUI imports
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
  }));

const ExerciseCategoryContainer = props => {
    
    const classes = useStyles();

    const createExerciseCards = () => {
        return props.exercises.map(exercise => {
            return <ExerciseCard key={Math.random()} exercise={exercise} />
        })
    }

    return (
        <Box className={classes.root}>
            {createExerciseCards()}
        </Box>
    );
};

export default ExerciseCategoryContainer;