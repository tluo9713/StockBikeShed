import React from 'react';
import PortfolioStock from './PortfolioStock';
import { connect } from 'react-redux';

const Portfolio = props => {
  let portfolioArray = [];
  let funds;
  if (props.user.id) {
    portfolioArray = props.transaction.portfolio;
    funds = props.user.funds;
  }
  return (
    <div>
      {portfolioArray.map(stock => (
        <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
      ))}
      {funds ? <h2>Cash Money : {funds}</h2> : ''}
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Portfolio);
