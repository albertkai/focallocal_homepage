import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {coreReducer} from './reducer.js';

const middleware = [thunk];
let devtools;

const loggerImmutable = logger({
  // Transform Immutable objects into JSON
  stateTransformer: (state) => {
    const newState = {};
    for (let i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  },
});

if (Meteor.isDevelopment) {
  // Add any middleware for dev environment only
  if (window.devToolsExtension) {
    devtools = window.devToolsExtension();
  } else {
    middleware.push(loggerImmutable);
    devtools = f => f;
  }
} else {
  devtools = f => f;
}

const enhancer = compose(
  applyMiddleware(...middleware),
  devtools,
);

const store = createStore(
  combineReducers({
    core: coreReducer,
  }),
  enhancer,
);

export {store};
