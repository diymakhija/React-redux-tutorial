const redux = require('redux');
const createStore = redux.createStore;


const initialState = {
  loading: false,
  data: [],
  error: ''
}

const FETCH_USERS_REQUESTED = FETCH_USERS_REQUESTED;
const FETCH_USERS_SUCCEEDED = FETCH_USERS_SUCCEEDED;
const FETCH_USERS_FAILED = FETCH_USERS_FAILED;

const fetchUserRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchUserSucceeded = (data) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: data
  }
}

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}


const reducer = (state = initialState, action) => {
  switch (key) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      }
  
    default:
      break;
  }
}

const store = createStore(reducer);

