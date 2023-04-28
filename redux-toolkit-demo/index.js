const store = require("./app/store");
const { fetchUsers } = require("./features/user/userSlice");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions;

console.log("Initial state = ", store.getState());
const unsubscribe = store.subscribe(() => {
  // console.log("Updated state = ", store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(5));

store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.restocked(5));

store.dispatch(fetchUsers());


// Because fetchUsers is an async event, we can not unsubscribe the store
// unsubscribe();

