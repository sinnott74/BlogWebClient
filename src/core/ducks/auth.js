/*
 * Auth actions
 */
import reducerRegistry from "core/redux/ReducerRegistry";
import { showToast } from "core/ducks/toast";
import { SERVER_PATH } from "core/constants";

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN_LOADING = "LOG_IN_LOADING";
export const LOG_IN_FAILED = "LOG_IN_FAILED";

/**
 * Reducer
 */
let defaultState = {
  username: "",
  role: "",
  token: "",
  loggedIn: false,
  isLoading: false,
  hasErrored: false
};

let user = JSON.parse(localStorage.getItem("user"));

let initialState = user
  ? { ...defaultState, ...user, loggedIn: true }
  : defaultState;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_LOADING:
      return {
        ...defaultState,
        isLoading: true
      };
    case LOG_IN_FAILED:
      return {
        ...defaultState,
        hasErrored: true
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...defaultState,
        isLoading: false,
        hasErrored: false,
        ...action.user,
        loggedIn: true
      };
    case LOG_OUT:
      localStorage.removeItem("user");
      return {
        ...defaultState
      };
    default:
      return state;
  }
}

reducerRegistry.register("auth", reducer);

/**
 * Action Creators
 */
function logUserOut() {
  return {
    type: LOG_OUT
  };
}

function loginLoading(bool) {
  return {
    type: LOG_IN_LOADING,
    isLoading: bool
  };
}

function loginFailed() {
  return {
    type: LOG_IN_FAILED
  };
}

function loginSuccess(credentials) {
  return {
    type: LOG_IN_SUCCESS,
    user: credentials
  };
}

export function login(username, password) {
  return function(dispatch) {
    dispatch(loginLoading(true));
    fetch(`${SERVER_PATH}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loginLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(credentials => dispatch(loginSuccess(credentials)))
      .then(() => dispatch(showToast("Log In Successful")))
      .catch(err => {
        console.log(err);
        dispatch(loginFailed());
        dispatch(showToast("Log In Failed"));
      });
  };
}

export function signUp(user) {
  return function(dispatch) {
    dispatch(loginLoading(true));
    fetch(`${SERVER_PATH}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loginLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(credentials => dispatch(loginSuccess(credentials)))
      .then(() => dispatch(showToast("Sign Up Successful")))
      .catch(err => {
        console.log(err);
        dispatch(loginFailed());
        dispatch(showToast("Sign Up Failed"));
      });
  };
}

export function logout() {
  return function(dispatch) {
    dispatch(logUserOut());
    dispatch(showToast("Log Out Successful"));
  };
}

/**
 * Selectors
 */

export function isLoggedIn(state) {
  return state.auth.loggedIn;
}

export function getLoggedInUserID(state) {
  return state.auth.id;
}

export function getLoggedInUsername(state) {
  return state.auth.username;
}
