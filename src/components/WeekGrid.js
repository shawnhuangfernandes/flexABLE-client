import React from "react";

const WeekGrid = props => {
  console.log(props.currentDate);
  console.log(props.firstDayOfWeek);
  console.log(props.weekWorkouts);

  const weekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
    return {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      Day: parseInt(arr[2])
    };
  };

  // method that creates Day Cards from week Workouts
  const createDayCards = () => {
    for (let i = 0; i < 7; i++) {
      console.log(props.firstDayOfWeek)
      props.firstDayOfWeek.setDate(props.firstDayOfWeek.getDate() + 1);
    }

    return null;
  };
  return <div>{createDayCards()}</div>;
};

export default WeekGrid;
