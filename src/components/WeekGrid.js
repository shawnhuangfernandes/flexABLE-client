import React from "react";

const WeekGrid = props => {
  console.log(props.currentDate);
  console.log(props.firstDayOfWeek);
  console.log(props.weekWorkouts);

  // calendar date formatter (for incoming api dates) goes here
  const dateRbFormatter = rbDate => {
    const arr = rbDate.split("-"); // split the string date (e.g "2020-04-06") by dashes
    return {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      Day: parseInt(arr[2])
    };
  };
  return <div></div>;
};

export default WeekGrid;
