import React from "react";

const WeekGrid = props => {
//   console.log(props.currentDate);
//   console.log(props.firstDayOfWeek);
  console.log(props.weekWorkouts);

// an array that holds the week names in order that they will
  const weekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // method that creates Day Cards from week Workouts
  const createDayCards = () => {
    for (let i = 0; i < 7; i++) {
      console.log(props.dateJsFormatter(props.firstDayOfWeek)); // I will pass the 'normalized' date to the card component
      console.log(weekNames[i]); // I will pass the name of the week to the card component
      console.log(props.weekWorkouts[i]) // I will pass the workouts for the specific day of the week to the component
      props.firstDayOfWeek.setDate(props.firstDayOfWeek.getDate() + 1);
    }

    return null;
  };
  return <div>{createDayCards()}</div>;
};

export default WeekGrid;

// calendar date formatter (for incoming api dates) goes here
const dateRbFormatter = rbDate => {
  const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
  return {
    year: parseInt(arr[0]),
    month: parseInt(arr[1]),
    Day: parseInt(arr[2])
  };
};
