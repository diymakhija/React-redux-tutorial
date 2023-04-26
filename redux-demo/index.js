const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;


console.log("From index.js");

// Action name 
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

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

// State of the application can be maintaned as single object
const initialState = {
  numOfCakes: 10
}


// Reducer 
// (previousState action) => newState

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer); // Responsibility 1 - reducer manages state and get initialState
console.log('Initial state ', store.getState());   // Responsibility 2

const unsubscribe = store.subscribe(() => { // Responsibility 4
  console.log('Update state ', store.getState());
});

// store.dispatch(orderCake()); // Responsibility 3
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5));

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);

unsubscribe(); // Responsibility 5


