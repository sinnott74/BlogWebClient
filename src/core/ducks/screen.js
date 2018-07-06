import reducerRegistry from "core/redux/ReducerRegistry";

/*
 * Sidenav actions
 */
const SMALL_SCREEN = "SMALL_SCREEN";
const LARGE_SCREEN = "LARGE_SCREEN";

/**
 * Reducer
 */
let initialState = {
  large: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SMALL_SCREEN:
      return {
        ...state,
        large: false
      };
    case LARGE_SCREEN:
      return {
        ...state,
        large: true
      };
    default:
      return state;
  }
}

reducerRegistry.register("screen", reducer);

/**
 * Action Creators
 */
export function largeScreen() {
  return {
    type: LARGE_SCREEN
  };
}

export function smallScreen() {
  return {
    type: SMALL_SCREEN
  };
}
