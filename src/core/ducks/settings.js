import reducerRegistry from "core/redux/ReducerRegistry";

/*
 * Sidenav actions
 */
const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";

/**
 * Reducer
 */
let initialState = {
  darkTheme: localStorage.getItem("darkTheme") === "true" || false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKTHEME:
      let darkTheme = !state.darkTheme;
      localStorage.setItem("darkTheme", darkTheme);
      return {
        ...state,
        darkTheme: darkTheme
      };
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export function toggleDarkTheme() {
  return {
    type: TOGGLE_DARKTHEME
  };
}

/**
 * Selectors
 */
export function isDarkTheme(state) {
  return state.settings.darkTheme;
}

reducerRegistry.register("settings", reducer);
