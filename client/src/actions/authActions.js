import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_NOTIFICATIONS } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login and get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  logoutClear();
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header
  setAuthToken(false);
  //Set current user to {}
  dispatch(setCurrentUser({}));
};

export const clearNewPosts = () => dispatch => {
  dispatch(clearNotifications());
  axios
    .get("api/users/clearnewposts")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const logoutClear = () => {
  axios
    .get("api/users/clearnewposts")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
