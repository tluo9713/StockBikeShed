import React from 'react';
import PortfolioStock from './PortfolioStock';
import { combineTransactions } from '../store/transaction';
import { connect } from 'react-redux';

class Portfolio extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.grabTransactions(this.props.user);
  }

  render() {
    console.log('should be rendering', this.props);
    let combinedArray = this.props.allTransactions;
    console.log(combinedArray);
    return (
      <div>
        {combinedArray.map(stock => (
          <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  allTransactions: state.transaction || [],
  combinedArray: state.combinedTransactions || [],
});

const mapDispatch = dispatch => {
  return {
    grabTransactions(user) {
      dispatch(combineTransactions(user.id));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Portfolio);
