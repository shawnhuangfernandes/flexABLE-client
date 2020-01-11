import React, { useEffect } from "react";
import Calendar from "react-calendar";
import {useDispatch} from 'react-redux'
import { setCurrentDate } from "../redux/actionList";

const PlannerBodyContainer = () => {
    const dispatch = useDispatch()

    const onSetDate = date => {
        dispatch(setCurrentDate(date))
    }
  
    // After MainContainer Component Mounts On Page
  useEffect(() => {
    
    // eslint-disable-next-line
  }, []);

    return (
    <div>
      <Calendar onClickDay={onSetDate} activeStartDate={new Date()} value={new Date()}/>
    </div>
  );
};

export default PlannerBodyContainer;
