import { createStore } from 'redux';

// Looks like it takes a state which defaults to empty, and an action?
// What is a reducer function? This apparently:
const reducer = (state = {}, action) => {
  switch (action.type) {
    // Define action types and corresponding state changes here?
    default:
      return state;
  }
};

// create the store (what is a store?)
const store = createStore(reducer);

export default store;
