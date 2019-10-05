import axios from 'axios';
// import history from '../history'

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
// const createUser = user => ({type: GET_USER, user})
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    console.log('heh');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const signUpUser = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res;
  try {
    res = await axios.post('/api/users', {
      email,
      password,
      firstName,
      lastName,
    });
    console.log('created user', res.data);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    console.log('in sign up user');
    dispatch(getUser(res.data));
    // history.push('/home')
  } catch (error) {
    console.error(error);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  console.log('IM IN STORE', method);
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    console.log('FUCK', authError);
    return dispatch(getUser({ error: authError }));
  }
  console.log('store', res.data);
  try {
    dispatch(getUser(res.data));
    // history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    // history.push('/login')
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
