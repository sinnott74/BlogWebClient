import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import reducerRegistry from "./ReducerRegistry";
export const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(middleware, thunk));

const combine = reducers => {
  const initialState = store ? store.getState() : {};
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

const rootReducer = combine(reducerRegistry.getReducers());

const store = createStore(rootReducer, enhancer);

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
