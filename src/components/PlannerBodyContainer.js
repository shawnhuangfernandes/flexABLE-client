import React, { useEffect } from "react";
import Calendar from "react-calendar";
import {useDispatch} from 'react-redux'
import { setCurrentDate } from "../redux/actionList";

// Renders the Planner Section of FlexABLE
const PlannerBodyContainer = () => {
    const dispatch = useDispatch() // dispatch for settings Redux State

    // method for when a day on the Calendar is clicked
    const onSetDate = date => {
        dispatch(setCurrentDate(date)) // set Redux state to the selected date
    }
  
    // After Planner Body Component Mounts On Page
    useEffect(() => {
        
        // eslint-disable-next-line
    }, []);

    // Returns the Calendar which starts on today's date
    return (
    <div>
      <Calendar onClickDay={onSetDate} activeStartDate={new Date()} value={new Date()}/>
    </div>
  );
};

export default PlannerBodyContainer;
