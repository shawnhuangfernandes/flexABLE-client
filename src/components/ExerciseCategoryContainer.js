// React specific imports
import React from 'react';
import ExerciseCard from './ExerciseCard'

// MUI imports
import Grid from '@material-ui/core/Grid'

const ExerciseCategoryContainer = props => {
    
    const createExerciseCards = () => {
        return props.exercises.map(exercise => {
            return <ExerciseCard key={Math.random()} exercise={exercise} />
        })
    }

    return (
        <Grid container spacing={3}>
            {createExerciseCards()}
        </Grid>
    );
};

export default ExerciseCategoryContainer;