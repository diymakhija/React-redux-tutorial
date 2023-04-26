const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const UPDATED_STREET = "UPDATED_STREET";

const updateStreet = (street) => {
  return {
    type: UPDATED_STREET,
    payload: street
  }
}

const initialState = {
  name: "John Doe",
  address: {
    street: "Gumshudha talash kender",
    city: "New Delhi",
    state: "Delhi"
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_STREET:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload
      //   }
      // }  

      // produce is used to merge nested state
      return produce(state, (draft) => {
        draft.address.street = action.payload
      })
    default:
      return state;
  }
}

const store = createStore(reducer);
console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Update state ', store.getState());
})

store.dispatch(updateStreet("Dariyaganj, Kothvali"));

unsubscribe();
