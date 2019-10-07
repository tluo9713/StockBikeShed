import axios from 'axios';
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FUNDS = 'GET_FUNDS';
const UPDATE_FUNDS = 'UPDATE_FUNDS';

/**
 * INITIAL STATE
 */
const defaultFunds = 0;

/**
 * ACTION CREATORS
 */
const getFunds = funds => ({ type: GET_FUNDS, funds });
const updateFunds = funds => ({ type: UPDATE_FUNDS, funds });

/**
 * THUNK CREATORS
 */
export const getUserFunds = funds => async dispatch => {
  dispatch(getFunds(funds));
};

export const updateUserFunds = funds => async dispatch => {
  console.log('we thunk it', funds);
  dispatch(updateFunds(funds));
};

/**
 * REDUCER
 */
export default function(state = defaultFunds, action) {
  switch (action.type) {
    case GET_FUNDS:
      return action.funds;
    case UPDATE_FUNDS:
      return state - action.funds;
    default:
      return state;
  }
}
