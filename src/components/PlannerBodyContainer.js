import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate } from "../redux/actionList";
import { api } from "../services/api";

// Renders the Planner Section of FlexABLE
const PlannerBodyContainer = () => {
  const dispatch = useDispatch(); // dispatch for settings Redux State
  const user = useSelector(state => state.authReducer.user);

  // method for when a day on the Calendar is clicked
  const onSetDate = date => {
    dispatch(setCurrentDate(date)); // set Redux state to the selected date
    const dateInfo = {
      user_id: user.id,
      dayOfWeek: date.getDay(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getYear()
    };

    api.workouts
      .getCurrentWeekWorkouts(dateInfo)
      .then(workoutsData => console.log(workoutsData));
  };

  // After Planner Body Component Mounts On Page
  useEffect(() => {
    onSetDate(new Date());
    // eslint-disable-next-line
  }, []);

  // Returns the Calendar which starts on today's date
  return (
    <div>
      <Calendar
        onClickDay={onSetDate}
        activeStartDate={new Date()}
        value={new Date()}
      />
    </div>
  );
};

export default PlannerBodyContainer;
