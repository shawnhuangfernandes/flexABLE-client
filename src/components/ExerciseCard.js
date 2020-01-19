import React from 'react';

const ExerciseCard = props => {
    console.log(props.exercise);
    return (
        <div>
            {props.exercise.name}
            {props.exercise.description}
        </div>
    );
};

export default ExerciseCard;