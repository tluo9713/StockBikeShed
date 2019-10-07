import axios from 'axios';
import history from '../history';
import { getUserFunds } from './funds';
import { getUserTransaction } from './transaction';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //this thunk will check if user was signed in using the auth route which
    //check if we can find user in session.
    const res = await axios.get('/auth/me');
    //dispatch the user
    dispatch(getUser(res.data || defaultUser));
    //since we have the user, we might as well dispatch the funds on the account
    dispatch(getUserFunds(res.data.funds));
    //and then grab the transactions from the user based on id
    dispatch(getUserTransaction(res.data.id));
  } catch (err) {
    console.error(err);
  }
};

export const signUpUser = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  let res;
  try {
    res = await axios.post('/api/users', {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    //Get user funds after creating an account, no need to grab transactions
    //as there is not transactions on a new account.
    dispatch(getUserFunds(res.data.funds));
    dispatch(getUser(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  //this is for signing in
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    //if successfully signed in, grab user funds and user into the store.
    dispatch(getUserFunds(res.data.funds));
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    //user delete route to delete user from session and log out user.
    await axios.delete('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
