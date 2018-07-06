import reducerRegistry from "core/redux/ReducerRegistry";

/*
 * Sidenav actions
 */
const OPEN_OPTIONS_MENU = "OPEN_OPTIONS_MENU";
const CLOSE_OPTIONS_MENU = "CLOSE_OPTIONS_MENU";
const TOGGLE_OPTIONS_MENU = "TOGGLE_OPTIONS_MENU";

let initialState = {
  opened: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_OPTIONS_MENU:
      return {
        ...state,
        opened: true
      };
    case CLOSE_OPTIONS_MENU:
      return {
        ...state,
        opened: false
      };
    case TOGGLE_OPTIONS_MENU:
      return {
        ...state,
        opened: !state.opened
      };
    default:
      return state;
  }
}

reducerRegistry.register("optionsMenu", reducer);

/**
 * Action Creators
 */
export function openOptionsMenu() {
  return {
    type: OPEN_OPTIONS_MENU
  };
}

export function closeOptionsMenu() {
  return {
    type: CLOSE_OPTIONS_MENU
  };
}

export function toggleOptionsMenu() {
  return {
    type: TOGGLE_OPTIONS_MENU
  };
}

/**
 * Selectors
 */
export function isOpened(state) {
  return state.optionsMenu.opened;
}
