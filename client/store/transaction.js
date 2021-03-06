import axios from 'axios';
import { updateUserFunds } from './funds';
// import history from '../history'

/**
 * ACTION TYPES
 */

const GET_USER_TRANSACTION = 'GET_USER_TRANSACTION';
const CREATE_NEW_TRANSACTION = 'CREATE_NEW_TRANSACTION';
const COMBINE_TRANSACTIONS = 'COMBINE_TRANSACTIONS';
const STOCK_PURCAHSE_ERROR = 'STOCK_PURCAHSE_ERROR';

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

const combineToPortfolio = arr => ({
  type: COMBINE_TRANSACTIONS,
  combinedTransactions: arr,
});

const stockPurchaseError = obj => ({
  type: STOCK_PURCAHSE_ERROR,
  error: obj,
});

//This will grab transaction history and consolidate all stocks with the same
//name.
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

//Grab all user transactions
export const getUserTransaction = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transactions/${id}`);
    //dispatch transaction
    dispatch(getTransaction(res.data || defaultTransaction));
    const portfolioStocks = combineTransactions(res.data);
    //use function to consolidate all stocks
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
    const amount = res.data.shares;
    const cost = amount * purchasePrice;
    //Instead of making another call to check the funds in the user account
    //we already have user funds, so we can just subtract the cost from the
    //funds in store.
    dispatch(updateUserFunds(cost));
    //grabs the all user transactions so the front end will display the stock
    //that was just purchased
    dispatch(getUserTransaction(userId));
  } catch (stockError) {
    dispatch(stockPurchaseError({ error: stockError }));
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
    case STOCK_PURCAHSE_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
