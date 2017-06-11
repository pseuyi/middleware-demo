import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

// middleware
const addLoggingToDispatch = store => next => action => {
  console.log('prev state: ', store.getState())
  console.log('action: ', action)
  next(action)
  console.log('curr state: ', store.getState())
}

// applyMiddleware
const applyMiddleware = (store, ...middlewares) => {
  let dispatch = store.dispatch
  middlewares.forEach(middleware => {
    dispatch = middleware(store)(dispatch) // function (action) {dispatch(action)}
  })
  return Object.assign({}, store, {dispatch})
}

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  store = applyMiddleware(configureStore(preloadedState), addLoggingToDispatch)
  const root = document.getElementById('content');
  ReactDOM.render(<Root store={store} />, root);
});

/*
middlewares = [anotherOne, addLogging]

  anotherOne(store) =>
    function (next) {
      (action) => next(action)
    }


  addLogging(store) =>
    function (next) {
      (action) => next(action)
    }

    anotherOne(store)(dispatch)
     -> function (action) => dispatch(action)

1. dispatch = function (action) => dispatch(action)
2. dispatch = function ()

*/
