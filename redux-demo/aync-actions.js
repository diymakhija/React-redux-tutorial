const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

// redux
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// redux-thunk

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// Action creators
const fetchUserRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUserSucceeded = (data) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: data,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      break;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data is the users data
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSucceeded(users));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUserFailed(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log("Initial state ", store.getState());
})
store.dispatch(fetchUsers());