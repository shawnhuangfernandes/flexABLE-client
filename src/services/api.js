const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: token
};

const login = data => {
    return fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json());
  };

  const signUp = data => {
    return fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json());
  };
  
  const getCurrentUser = () => {
    return fetch(`${API_ROOT}/user_is_authed`, {
      headers
    }).then(res => {
      return res.json()});
  };

  export const api = {
    auth: {
      signUp,
      login,
      getCurrentUser
    }
  };