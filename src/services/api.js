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

// METHOD: api request to delete a user
const deleteUser = user => {
  return fetch(`${API_ROOT}/users/${user.id}`, {
    method: "DELETE",
    headers
  }).then(deleteResponse => {
    return deleteResponse.json();
  });
};

// METHOD: get the current user from the backend
const getCurrentUser = () => {
  return fetch(`${API_ROOT}/user_is_authed`, {
    headers
  }).then(userData => {
    return userData.json();
  });
};

// METHOD: update the current user information
const updateCurrentUser = userInfo => {
  return fetch(`${API_ROOT}/users/${userInfo.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(userInfo)
  }).then(updatedUserInfo => {
    return updatedUserInfo.json();
  });
};

// METHOD: create a new workout 
const createNewWorkout = workoutInfo => {
  return fetch(`${API_ROOT}/users/${workoutInfo.user_id}/workouts`, {
    method: "POST",
    headers,
    body: JSON.stringify(workoutInfo)
  }).then(updatedWorkoutInfo => {
    return updatedWorkoutInfo.json();
  });
};

// METHOD: delete a workout
const deleteWorkout = workout => {
  return fetch(`${API_ROOT}/users/${workout.user_id}/workouts/${workout.id}`, {
    method: "DELETE",
    headers
  }).then(deleteResponse => {
    return deleteResponse.json();
  });
};

// METHOD: Update a workout
const updateWorkout = workoutInfo => {
  return fetch(
    `${API_ROOT}/users/${workoutInfo.user_id}/workouts/${workoutInfo.id}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(workoutInfo)
    }
  ).then(updatedWorkoutInfo => {
    return updatedWorkoutInfo.json();
  });
};

// METHOD: get all workouts
const getWorkouts = user => {
  return fetch(`${API_ROOT}/users/${user.id}/workouts`, {
    headers
  }).then(workoutsData => {
    return workoutsData.json();
  });
};

// METHOD: get all exercises
const getAllExercises = () => {
  return fetch(`${API_ROOT}/exercises`, {
    headers
  }).then(userData => {
    return userData.json();
  });
};

// export all the api service methods for use in other files
export const api = {
  auth: {
    signUp,
    login,
    getCurrentUser,
    deleteUser,
    updateCurrentUser
  },
  workouts: {
    getWorkouts,
    updateWorkout,
    createNewWorkout,
    deleteWorkout
  },
  exercises: {
    getAllExercises
  }
};
