import React from "react";
import MainContainer from "./MainContainer";
import { Provider } from 'react-redux'
import store from "../redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;
