import axios from 'axios';
import { updateUserFunds } from './funds';
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
// const createTransaction = (ticker, shares) => ({
//   type: CREATE_NEW_TRANSACTION,
//   ticker,
//   shares,
// });

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

export const createNewTransaction = (
  ticker,
  shares,
  userId
) => async dispatch => {
  try {
    const res = await axios.post(`/api/transactions`, {
      ticker,
      shares,
      userId,
    });
    const { purchasePrice } = res.data;
    console.log('in store', purchasePrice);
    const amount = res.data.shares;
    const cost = (amount * purchasePrice) / 10000;
    dispatch(updateUserFunds(cost));
    dispatch(getUserTransaction(userId));
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
      return {
        ...state,
        recentPurchase: { ticker: action.ticker, shares: action.shares },
      };
    case COMBINE_TRANSACTIONS:
      return { ...state, portfolio: action.combinedTransactions };
    default:
      return state;
  }
}
