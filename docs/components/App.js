import React from "react";
import MainContainer from "./MainContainer";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/store";

// This is the app component it simply renders a main container
const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <MainContainer /> {/* Main container (fragment) */}
      </Provider>
    </Router>
  );
};

export default App;
