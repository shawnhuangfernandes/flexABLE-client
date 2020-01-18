import React from 'react';

const WorkoutItem = props => {

    console.log(props.workout);

    return (
        <div>
            <p>{props.workout.exercise.name}</p>
            <p>{props.workout.completed ? "Completed" : "Incomplete"}</p>
        </div>
    );
};

export default WorkoutItem;