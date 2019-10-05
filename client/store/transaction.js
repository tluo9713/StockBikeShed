import axios from 'axios';
// import history from '../history'

/**
 * ACTION TYPES
 */

const GET_USER_TRANSACTION = 'GET_USER_TRANSACTION';
const CREATE_NEW_TRANSACTION = 'CREATE_NEW_TRANSACTION';

/**
 * INITIAL STATE
 */
const defaultTransaction = [];

/**
 * ACTION CREATORS
 */
const getTransaction = transaction => ({
  type: GET_USER_TRANSACTION,
  transaction,
});
const createTransaction = (user, ticker, quantity) => ({
  type: CREATE_NEW_TRANSACTION,
  user,
  ticker,
  quantity,
});

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};
export const getUserTransaction = () => async dispatch => {
  try {
    const res = await axios.get(`/api/transactions/${1}`);
    dispatch(getTransaction(res.data || defaultTransaction));
  } catch (error) {
    console.error(error);
  }
};

export const createNewTransaction = () => async dispatch => {
  try {
    const res = await axios.post(`/api/transactions`);
    dispatch(createTransaction(res.data || defaultTransaction));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultTransaction, action) {
  switch (action.type) {
    case GET_USER_TRANSACTION:
      return action.transaction;
    case CREATE_NEW_TRANSACTION:
      return defaultTransaction;
    default:
      return state;
  }
}
