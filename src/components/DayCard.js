import React from 'react';
import WorkoutItem from './WorkoutItem'
import NewExerciseSelector from './NewExerciseSelector'

const DayCard = props => {

// this method renders a WorkoutItem for each workout passed via props for the day
const createWorkoutItems = () => {
  return props.workouts.map(workout => {
    return <WorkoutItem workout={workout} key={Math.random()}/>
  })
}

  return (
    <div>
      <p>{props.name}</p>
      <p>{props.currentDate.month} - {props.currentDate.day}</p>
      {createWorkoutItems()}
      <NewExerciseSelector currentDate={props.currentDate}/>
    </div>
  );
};

export default DayCard;