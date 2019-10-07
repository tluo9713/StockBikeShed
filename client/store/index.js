import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import transaction from './transaction';
import funds from './funds';

const reducer = combineReducers({ user, transaction, funds });
import { saveState } from './localStorage';

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);
// May need to use lodash throttle if system slows down.
// How often is the store state changing?
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
export * from './user';
export * from './transaction';
