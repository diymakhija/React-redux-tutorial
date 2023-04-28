const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


console.log("From index.js");

// Action name 
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Action Creator 
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1
  }
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  }
}
function orderIcecream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1
  }
}
function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  }
}

// State of the application can be maintaned as single object
const initialCakeState = {
  numOfCakes: 20,
}
const initialIcecreamState = {
  numOfIcecreams: 15
}


// Reducer 
// (previousState action) => newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      }
    default:
      return state;
  }
}
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      }
    case CAKE_ORDERED: // Free iceCream for every cake order
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1
      }
    default:
      return state;
  }
}

// combine all the reducers
const reducers = combineReducers({
  cake: cakeReducer, 
  icecream: icecreamReducer
});

/**
 * Responsibilities of store 
 * 
 * 1. Holds application state 
 * 2. Allows access to state via getState()
 * 3. Allows state to be updated via dispatch(action)
 * 4. Registers listener via subscribe(listener)
 * 5. Hanldes unregistering of listeners via the function returned by subscribe(listener)
 * 
 */

const store = createStore(reducers, applyMiddleware(logger)); // Responsibility 1 - reducer manages state and get initialState
console.log('Initial state ', store.getState());   // Responsibility 2

const unsubscribe = store.subscribe(() => {}); // Responsibility 4

// store.dispatch(orderCake()); // Responsibility 3
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5));

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(5);


unsubscribe(); // Responsibility 5


