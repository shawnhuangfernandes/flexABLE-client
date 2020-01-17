import React from 'react';

const DayCard = props => {

  // currentDate={dateCopy}
  // name={weekNames[index]}
//  console.log(props.workouts);

const createWorkoutItems = () => {
  props.workouts.map(workout => {
    console.log(workout);
    return workout
  })

  return null
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