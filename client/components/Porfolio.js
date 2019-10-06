import React from 'react';
import PortfolioStock from './PortfolioStock';
import { connect } from 'react-redux';

const Portfolio = props => {
  let portfolioArray = [];
  if (props.user.id) {
    portfolioArray = props.transaction.portfolio;
  }
  return (
    <div>
      {portfolioArray.map(stock => (
        <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
      ))}
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Portfolio);
