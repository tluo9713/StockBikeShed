import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import user from './user'
// import cart from './cart'
// import product from './product'
// import selectedProduct from './selectedProduct'

import user from './user';
import transaction from './transaction';

const reducer = combineReducers({ user, transaction });
import { saveState } from './localStorage';

// What persistedState will be will depend on how we design our state
// const persistedState = loadState();
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, /* persistedState,  */ middleware);
// May need to use lodash throttle if system slows down.
// How often is the store state changing?
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
export * from './user';
export * from './transaction';
