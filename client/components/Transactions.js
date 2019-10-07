import React from 'react';
import TransactionStocks from './TransactionStocks';
import { connect } from 'react-redux';

const Transactions = props => {
  let { user } = props;
  let transactions = [];
  if (props.transaction.transactionHistory) {
    transactions = props.transaction.transactionHistory.reverse();
  }

  return (
    <div>
      <table className="Transactioncontainer">
        <tr>
          <th>Ticker</th>
          <th>Shares Purchased</th>
          <th>Purchase Price</th>
          <th>Total Cost</th>
          <th>Date </th>
        </tr>
        {transactions.length
          ? transactions.map((transaction, index) => (
              <TransactionStocks key={index} transaction={transaction} />
            ))
          : 'No transactions yet'}
      </table>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Transactions);
