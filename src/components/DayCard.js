import React from 'react';
import WorkoutItem from './WorkoutItem'

const DayCard = props => {

const createWorkoutItems = () => {
  return props.workouts.map(workout => {
    return <WorkoutItem workout={workout} key={Math.random()}/>
  })
}

  return (
    <div>
      <p>{props.name}</p>
      <p>{props.currentDate.day} - {props.currentDate.month}</p>
      {createWorkoutItems()}
    </div>
  );
};

export default DayCard;