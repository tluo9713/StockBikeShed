import React from 'react';
import TransactionStocks from './TransactionStocks';
import { connect } from 'react-redux';
import { getUserTransaction } from '../store/transaction';

class Transactions extends React.Component {
  constructor() {
    super();
  }
  //grab user info for stocks
  componentDidMount() {
    console.log('console', this.props.user);
    this.props.grabTransactions(this.props.user);
  }
  render() {
    let { user } = this.props;
    let transactions = [];
    if (user.id) {
      transactions = this.props.transaction.transactionHistory.reverse();
    }
    // let transactions = this.props.transaction.transactionHistory;
    // if (transactions) {
    //   transactions.reverse();
    // }
    // if (transactions)
    // console.log('transactions', test);
    // console.log(transactions);
    return (
      <div>
        {transactions.map((transaction, index) => (
          <TransactionStocks key={index} transaction={transaction} />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

const mapDispatch = dispatch => {
  return {
    grabTransactions(user) {
      dispatch(getUserTransaction(user.id));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Transactions);
