/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux' 

/* Create Counter component which takes value, onIncrement, and onDecrement as its parameters */
const Counter = ({ value, onIncrement, onDecrement, onReset }) => (
  <div id="counter-app">
    <div id="display-container" className="container">
      <p id="display">{value}</p>
    </div>
    <div id="buttons-container" className="container">
      <button id="increment-button" className="button" onClick={onIncrement}><i className="fa fa-plus"></i></button>
      <button id="decrement-button" className="button" onClick={onDecrement}><i className="fa fa-minus"></i></button>
      <button id="reset-button" className="button" onClick={onReset}><i className="fa fa-refresh"></i></button>
    </div>
  </div>
)

/* Wrapper function for ReactDOM.render functionality for the app */
const render = () => {
  ReactDOM.render(
    <Counter 
      value={store.getState().count}
      onIncrement={() => {
        const val = store.getState().count;
        if (val < 10) {
          store.dispatch({
            type: 'INCREMENT'
          });
        }
      }}
      onDecrement={() => {
        const val = store.getState().count;
        if (val > -9) {
          store.dispatch({
            type: 'DECREMENT'
          });
        };
      }}
      onReset={() => {
        store.dispatch({
          type: 'RESET'
        });
      }}
      />,
    document.getElementById('app')
  )
}


// REDUCER
/* counter takes a default value for state, and an action */
const counter = (state = {count:0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count:state.count + 1};
    case 'DECREMENT':
      return {count:state.count - 1};
    case 'RESET':
      return {count: 0};
    default:
      return state;
  }
}

// STORE
/* store uses counter as its reducer */
const store = createStore(counter);

/* When the state in store changes, use this function */
store.subscribe(render);
// ACTION
//onIncrement // onDecrement

// DISPLAY IN THE CONSOLE
store.subscribe(()=>(console.log(store.getState())))

// DISPATCH
//store.dispatch inside onIncrement() // onDecrement()


render()