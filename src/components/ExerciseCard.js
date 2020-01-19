import React from 'react';

const ExerciseCard = props => {
    console.log(props.exercise);
    return (
        <div>
            {props.exercise.name}
            <br></br>
            {props.exercise.description}
            <br></br>
            <br></br>
        </div>
    );
};

export default ExerciseCard;