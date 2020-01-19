import React from 'react';
import ExerciseCard from './ExerciseCard'

const ExerciseCategoryContainer = props => {
    
    const createExerciseCards = () => {
        return props.exercises.map(exercise => {
            return <ExerciseCard key={Math.random()} exercise={exercise} />
        })
    }

    return (
        <div>
            {createExerciseCards()}
        </div>
    );
};

export default ExerciseCategoryContainer;