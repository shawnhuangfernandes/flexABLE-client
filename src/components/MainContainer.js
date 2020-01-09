import React, { useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { api } from "../services/api";
import { Route } from "react-router-dom";
import { signIn } from "../redux/actionList";
import {useDispatch} from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";

const MainContainer = props => {
  // React hook to use Redux dispatch
  const dispatch = useDispatch()

  // After MainContainer Component Mounts On Page
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    if (token) {
      // If a JWT token exists in local storage
      api.auth.getCurrentUser().then(user => {
      dispatch(signIn(user)); 
      });
    }
  }, []);

  return (
    // Renders the MainContainer component (a react-redux provider wrapped routing component)
    <Router>
      <div className="main-container">
        <Route exact path="/" render={() => <p>Hello</p>} />
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
      </div>
    </Router>
  );
};

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   };
// };

// const mapDispatchToProps = (dispatch, user) => {
//   // questionable
//   return {
//     signIn: () => dispatch(signIn(user))
//   };
// };

export default MainContainer;

// This method logs the user out
// logout = () => {
//   localStorage.removeItem('token'); // removes the JWT token of the user from local storage
//   this.setState({ auth: { user: {} } }); // -------------------- MARKED FOR REDUX REPLACEMENT
// };
