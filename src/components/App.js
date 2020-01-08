import React from 'react';
import SignIn from './SignIn';
import { api } from '../services/api';
import {Route} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      auth: {
        user: {}
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        console.log(user)
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: data };
    localStorage.setItem('token', data.jwt);
    this.setState({ auth: updatedState });  
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { user: {} } });
  };

  render() {
    return (
      <div className="App">
            <Route
              exact
              path="/login"
              render={routerProps => <SignIn {...routerProps} onLogin={this.login} />}
            />
      </div>
    );
  }
}

export default App;