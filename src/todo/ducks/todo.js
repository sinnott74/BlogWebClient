import {
  arrayToObject,
  objectToIDKeyedObject,
  addToArrayAndSort
} from "core/redux/util";
import { SERVER_PATH } from "core/constants";
import { showToast } from "core/ducks/toast";
import { createSelector } from "reselect";
import reducerRegistry from "core/redux/ReducerRegistry";

/*
 * Todo actions
 */
const LIST_TODOS = "LIST_TODOS";
const DELETE_TODO = "DELETE_TODO";
const LOADING_TODOS = "LOADING_TODOS";
const TODOS_ERRORED = "TODOS_ERRORED";
const STORE_TODO = "STORE_TODO";

/**
 * Reducer
 */
let initialState = {
  byId: {},
  allIds: [],
  isLoading: false,
  hasErrored: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TODOS:
      let todos = arrayToObject(action.todos);
      return {
        ...state,
        byId: {
          ...todos
        },
        allIds: Object.keys(todos)
      };
    case DELETE_TODO:
      let byId = { ...state.byId };
      delete byId[action.id];
      const allIds = state.allIds.filter(item => {
        return item !== action.id;
      });
      return {
        ...state,
        byId,
        allIds
      };
    case LOADING_TODOS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case TODOS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
        isLoading: false
      };
    case STORE_TODO:
      let todo = objectToIDKeyedObject(action.todo);
      return {
        ...state,
        byId: {
          ...state.byId,
          ...todo
        },
        allIds: addToArrayAndSort(state.allIds, action.todo.id.toString())
      };
    default:
      return state;
  }
}

reducerRegistry.register("todo", reducer);

/**
 * Action Creators
 */
function listTodos(todos) {
  return {
    type: LIST_TODOS,
    todos
  };
}

function removeTodo(id) {
  return {
    type: DELETE_TODO,
    id
  };
}

function loadingTodos(bool) {
  return {
    type: LOADING_TODOS,
    isLoading: bool
  };
}

function todoHasErrored(bool) {
  return {
    type: TODOS_ERRORED,
    hasErrored: bool
  };
}

function storeTodo(todo) {
  return {
    type: STORE_TODO,
    todo
  };
}

export function deleteTodo(id) {
  return function(dispatch, getState) {
    dispatch(loadingTodos(true));
    fetch(`${SERVER_PATH}/api/todos/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingTodos(false));
        return response;
      })
      .then(() => dispatch(removeTodo(id)))
      .then(() => dispatch(showToast("Todo deleted")))
      .catch(err => {
        dispatch(todoHasErrored(true));
        dispatch(showToast("Delete failed"));
      });
  };
}

export function addTodo(todo) {
  return function(dispatch, getState) {
    dispatch(loadingTodos(true));
    fetch(`${SERVER_PATH}/api/todos/`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        dispatch(loadingTodos(false));
        if (!response.ok) {
          return response.json().then(json => {
            throw Error(json.message);
          });
        }
        return response.json();
      })
      .then(addTodoResponse => {
        dispatch(storeTodo(addTodoResponse.todo));
      })
      .then(() => dispatch(showToast("Todo saved")))
      .catch(err => {
        console.log(err);
        dispatch(todoHasErrored(true));
        const message = err.message
          ? `Save failed: ${err.message}`
          : "Save failed";
        dispatch(showToast(message));
      });
  };
}

export function editTodo(todo) {
  return function(dispatch, getState) {
    dispatch(loadingTodos(true));
    fetch(`${SERVER_PATH}/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingTodos(false));
        return response;
      })
      // .then((response) => response.json()) // no response body on modify
      .then(() => dispatch(storeTodo(todo)))
      .then(() => dispatch(showToast("Todo saved")))
      .catch(err => {
        console.log(err);
        dispatch(todoHasErrored(true));
        dispatch(showToast("Save failed"));
      });
  };
}

export function loadTodos() {
  return function(dispatch, getState) {
    dispatch(loadingTodos(true));
    fetch(`${SERVER_PATH}/api/todos`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: getState().auth.token
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingTodos(false));
        return response;
      })
      .then(response => response.json())
      .then(getAllTodosResponse =>
        dispatch(listTodos(getAllTodosResponse.todos))
      )
      .catch(err => {
        console.log(err);
        dispatch(todoHasErrored(true));
      });
  };
}

/**
 * Selectors
 */

/**
 * @param {State} state Redux state object
 * @returns {Array<Todos>} List of Todos sorted by creation date from latest to earliest
 */
const getTodosByID = state => state.todo.byId;
export const getTodosSortedByCreatedByDate = createSelector(
  [getTodosByID],
  byID => {
    return Object.keys(byID)
      .map(id => {
        return byID[id];
      })
      .sort((o1, o2) => {
        const d1 = new Date(o1.created_on);
        const d2 = new Date(o2.created_on);
        // Latest to earliest
        return d2 - d1;
      });
  }
);
