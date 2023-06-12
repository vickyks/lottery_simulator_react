import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define initial lottery state
const initialState = {
  balls49: [],
  balls12: [],
  isDrawing: false,
};

// Define actions
const START_DRAWING = 'START_DRAWING';
const STOP_DRAWING = 'STOP_DRAWING';
const UPDATE_BALLS = 'UPDATE_BALLS';

// Define action creators
const startDrawing = () => ({ type: START_DRAWING });
const stopDrawing = () => ({ type: STOP_DRAWING });
const updateBalls = (balls49, balls12) => ({
  type: UPDATE_BALLS,
  payload: { balls49, balls12 },
});

// Define reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case START_DRAWING:
      return { ...state, isDrawing: true };
    case STOP_DRAWING:
      return { ...state, isDrawing: false };
    case UPDATE_BALLS:
      return {
        ...state,
        balls49: action.payload.balls49,
        balls12: action.payload.balls12,
      };
    default:
      return state;
  }
};

// create the store (what is a store?)
const store = createStore(reducer, applyMiddleware(thunk));

export { startDrawing, stopDrawing, updateBalls };
export default store;
