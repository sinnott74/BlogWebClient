import reducerRegistry from "core/redux/ReducerRegistry";

/*
 * Sidenav actions
 */
const OPEN_SIDENAV = "OPEN_SIDENAV";
const CLOSE_SIDENAV = "CLOSE_SIDENAV";
const TOGGLE_SIDENAV = "TOGGLE_SIDENAV";

/**
 * Reducer
 */
let initialState = {
  opened: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDENAV:
      return {
        ...state,
        opened: true
      };
    case CLOSE_SIDENAV:
      return {
        ...state,
        opened: false
      };
    case TOGGLE_SIDENAV:
      return {
        ...state,
        opened: !state.opened
      };
    default:
      return state;
  }
}

reducerRegistry.register("sidenav", reducer);

/**
 * Action Creators
 */
export function openSideNav() {
  return {
    type: OPEN_SIDENAV
  };
}

export function closeSideNav() {
  return {
    type: CLOSE_SIDENAV
  };
}

export function toggleSideNav() {
  return {
    type: TOGGLE_SIDENAV
  };
}

/**
 * Selectors
 */

export function isOpened(state) {
  return state.sidenav.opened;
}
