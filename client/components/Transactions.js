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
    <div className="Container">
      <div className="Transactioncontainer">
        {transactions.length
          ? transactions.map((transaction, index) => (
              <TransactionStocks key={index} transaction={transaction} />
            ))
          : 'No transactions yet'}
      </div>
      <div>
        <div className="PurchaseStockComponent"></div>
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Transactions);
