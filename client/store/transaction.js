import axios from 'axios';
// import history from '../history'

/**
 * ACTION TYPES
 */

const GET_USER_TRANSACTION = 'GET_USER_TRANSACTION';
const CREATE_NEW_TRANSACTION = 'CREATE_NEW_TRANSACTION';
const COMBINE_TRANSACTIONS = 'COMBINE_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const defaultTransaction = {};

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

const combineToPortfolio = arr => ({
  type: COMBINE_TRANSACTIONS,
  combinedTransactions: arr,
});

const combineTransactions = transactionHistory => {
  const combinedObj = {};
  transactionHistory.forEach(element => {
    if (!combinedObj[element.ticker]) {
      combinedObj[element.ticker] = 0;
    }
    combinedObj[element.ticker] += element.shares;
  });
  //convert to array
  const combinedArray = [];
  for (let ticker in combinedObj) {
    if (combinedObj.hasOwnProperty(ticker)) {
      combinedArray.push([ticker, combinedObj[ticker]]);
    }
  }
  return combinedArray;
};

/**
 * THUNK CREATORS
 */

export const getUserTransaction = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transactions/${id}`);
    dispatch(getTransaction(res.data || defaultTransaction));
    const portfolioStocks = combineTransactions(res.data);
    dispatch(combineToPortfolio(portfolioStocks));
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
      return { ...state, transactionHistory: action.transaction };
    case CREATE_NEW_TRANSACTION:
      return { state };
    case COMBINE_TRANSACTIONS:
      return { ...state, portfolio: action.combinedTransactions };
    default:
      return state;
  }
}
