import React from "react";
import Calendar from "react-calendar";

const PlannerBodyContainer = () => {
    const setCurrentDate = date => {
        console.log(date)
        console.log(new Date())
    }
  
    return (
    <div>
      <Calendar onChange={setCurrentDate}/>
    </div>
  );
};

export default PlannerBodyContainer;
