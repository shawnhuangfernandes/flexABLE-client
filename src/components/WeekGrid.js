import React from "react";
import DayCard from "./DayCard";

const WeekGrid = props => {
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

  // method that creates Day Cards from each day in the selected Week
  const createDayCards = () => {
    if (Object.keys(props.weekWorkouts).length !== 0) {
      return props.weekWorkouts.map((day, index) => {
        const dateCopy = props.dateJsFormatter(props.firstDayOfWeek)
        props.firstDayOfWeek.setDate(props.firstDayOfWeek.getDate() + 1);
        return (
          <DayCard
            key={Math.random()}
            currentDate={dateCopy}
            name={weekNames[index]}
            workouts={props.weekWorkouts[index]}
          />
        );
      });
    } else {
      return null;
    }
  };

  return <div>{createDayCards()}</div>;
};

export default WeekGrid;


