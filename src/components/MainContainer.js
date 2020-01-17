import React, { useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { api } from "../services/api";
import { Route } from "react-router-dom";
import { signIn, setExerciseList } from "../redux/actionList";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LandingContainer from "./LandingContainer";
import DashboardContainer from "./DashboardContainer";
const MainContainer = props => {
  // React hook to use Redux dispatch
  const dispatch = useDispatch();
  // After MainContainer Component Mounts On Page
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    if (token) {
      // If a JWT token exists in local storage
      api.auth.getCurrentUser().then(user => {
        dispatch(signIn(user));
      });

      api.exercises
        .getAllExercises()
        .then(exercises => dispatch(setExerciseList(exercises)));
    }
    // eslint-disable-next-line
  }, []);

  return (
    // Renders the MainContainer component (a react-redux provider wrapped routing component)
    <Router>
      <div className="main-container">
        <Route exact path="/" render={() => <LandingContainer />} />
        <Route
          exact
          path="/login"
          render={routerProps => <SignIn {...routerProps} />}
        />
        <Route
          exact
          path="/signup"
          render={routerProps => <SignUp {...routerProps} />}
        />
        <Route
          exact
          path="/dashboard/:selection"
          render={routerProps => <DashboardContainer {...routerProps} />}
        />
      </div>
    </Router>
  );
};

export default MainContainer;
