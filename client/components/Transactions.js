import React from 'react';
import TransactionStocks from './TransactionStocks';
import { connect } from 'react-redux';

const Transactions = props => {
  let { user } = props;
  let transactions = [];
  console.log(props);
  if (user.id) {
    transactions = props.transaction.transactionHistory.reverse();
  }

  return (
    <div>
      {transactions.map((transaction, index) => (
        <TransactionStocks key={index} transaction={transaction} />
      ))}
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Transactions);
