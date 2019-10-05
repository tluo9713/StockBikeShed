import React from 'react';
import TransactionStocks from './TransactionStocks';
import { connect } from 'react-redux';
import { getUserTransaction } from '../store/transaction';

class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [
        { name: 'MSFT', amount: '50', purchasePrice: '400', time: '5oclock' },
        { name: 'APPL', amount: '50', purchasePrice: '400', time: '4oclock' },
        { name: 'MSFT', amount: '40', purchasePrice: '500', time: '3oclock' },
      ],
    };
  }
  //grab user info for stocks
  componentDidMount() {
    console.log('console', this.props.user);
    this.props.grabTransactions(this.props.user);
  }
  render() {
    console.log();
    let transactions = this.props.allTransactions;
    console.log(transactions);
    console.log(this.props);

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

const mapDispatch = (dispatch, ownProps) => {
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
