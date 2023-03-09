import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'

// User init State
const userInitState = {
  res: 1,
  lastUpdated: [],
}
// cart init state
const cartInitState = {
  count: 1,
  items: [],
}

//user reducer that update user state in the store 
const userReducer = (state = userInitState, action) => {
  switch(action.type) {
    case "ADD":
      state = {
        ...state,
        res : state.res + action.payload
      };
      break;
    case "SUB":
      state = {
        ...state,
        res : state.res - action.payload
      };
      break;  
    default:
      break;
  }
  return state;
}
// Cart Reducer To Update Changes That Happend On The Cart State
const cartReducer = (state = cartInitState, action) => {
  switch(action.type) {
    case "ADD_TO_CART":
      state = {
        ...state,
        count : state.count + action.payload
      };
      break;
    case "REMOVE_FROM_CART":
      state = {
        ...state,
        count : state.count - action.payload
      };
      break;  
    default:
      break;
  }
  return state;
}

// The Middileware That Will Allow To The store Before The State Changed To Do Some Code
const myLogger = (store) => (next) => (action) => {
  console.log(action) // Custom MiddleWare That Hook Into The Action Before Raeches to the reducer
  next(action);
}


// The Store That Hold The Hole Data Of The APP
const store = createStore(combineReducers({userReducer, cartReducer}), {}, applyMiddleware(logger)) // this method takes two values (theReducer, initial value of the state)

store.subscribe(() =>{
  console.log(store.getState())
})

// Now We Going To The Dispatch That Send To The Reducer The Arguments That Needs are action type
// and the payload => which mean the values that will changed in the state

store.dispatch({ // Dispatch That sending the action to the reducer that allowing to change the state
  type: "ADD", 
  payload: 10
})
store.dispatch({
  type: "ADD",
  payload: 15
})
store.dispatch({
  type: "SUB",
  payload: 5
})

store.dispatch({
  type: "ADD_TO_CART",
  payload: 10
})

// console.log(false + cartInitState) // [Object Object Errors]



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
