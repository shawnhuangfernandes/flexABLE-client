const API_ROOT = `http://localhost:3000/api/v1`; // root url of backend (rails)
const token = localStorage.getItem("token"); // current value of jwt token in local storage

// headers for all requests never change, so store them in a variable for use for all fetches
const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json",
  Authorization: token // special note for authorization, if token is not present, requests will have issues
};

// METHOD: api request for logging a user in and returning the user information (or error)
const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  }).then(userData => userData.json());
};

// METHOD: api request for signing up a NEW user and passing that new user data back (or an error)
const signUp = data => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  }).then(userData => userData.json());
};

// METHOD: api request for getting a current user (to verify that they are authorized)
const getCurrentUser = () => {
  return fetch(`${API_ROOT}/user_is_authed`, {
    headers
  }).then(userData => {
    return userData.json();
  });
};

const getCurrentWeekWorkouts = workoutInfo => {
  return fetch(`${API_ROOT}/week_workout`, {
    method: "POST",
    headers,
    body: JSON.stringify(workoutInfo)
  }).then(weekWorkoutData => {
    return weekWorkoutData.json();
  });
};

const updateWorkoutDescription = workoutInfo => {
  return fetch(`${API_ROOT}/week_workout`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(workoutInfo)
  }).then(updatedWorkoutInfo => {
    return updatedWorkoutInfo.json();
  });
};

// export all the api service methods for use in other files
export const api = {
  auth: {
    signUp,
    login,
    getCurrentUser
  },
  workouts: {
    getCurrentWeekWorkouts,
    updateWorkoutDescription
  }
};
