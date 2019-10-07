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
//This will initially get the funds from the users and add it to the store.
export const getUserFunds = funds => async dispatch => {
  dispatch(getFunds(funds));
};

//Every update afterwards will be using the update funds because we can just
//subtract from the funds in the store instead of making another api call.
export const updateUserFunds = funds => async dispatch => {
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
