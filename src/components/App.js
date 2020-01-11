import React from "react";
import MainContainer from "./MainContainer";
import { Provider } from 'react-redux'
import store from "../redux/store";

// This is the app component it simply renders a main container
const App = () => {
  return (
    <Provider store={store}> {/* Wrap the main container with a Provider w/ store to set up redux state */}
      <MainContainer /> {/* Main container (fragment) */}
    </Provider>
  );
};

export default App;
