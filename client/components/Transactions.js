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
    let transactions = this.props.allTransactions.reverse();
    console.log(transactions);
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
  allTransactions: state.transaction || [],
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
