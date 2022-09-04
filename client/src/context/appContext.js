import React, { useState, useReducer, useContext } from 'react';
import reducer from './reducer';
import {
  DISPLAY_ALERT,    
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR
} from './actions';
import axios from 'axios';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token || '',
  userLocation: userLocation || '',
  jobLocation: '',
}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    })
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('token',token);
    localStorage.setItem('location',location);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.setItem('user',null);
    localStorage.setItem('token','');
    localStorage.setItem('location','');
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register/', currentUser);
      const { user, token, location } = response.data;
      //console.log(response);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error);
      dispatch({ type: REGISTER_USER_ERROR, payload: { message: error.response.data.message } });
    }
    clearAlert();
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const {data} = await axios.post('/api/v1/auth/login/', currentUser);
      const { user, token, location } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token, location } });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: { message: error.response.data.message } });
    }
    clearAlert();
  }

  const setupUser = async ({ currentUser, alertText, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}/`, currentUser);
      const { user, token, location } = data;
      dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR, payload: { message: error.response.data.message } });
    }
    clearAlert();
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }