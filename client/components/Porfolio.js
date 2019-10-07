import React from 'react';
import PortfolioStock from './PortfolioStock';
import { connect } from 'react-redux';
import PurchaseStocks from './PurchaseStocks';

const Portfolio = props => {
  let portfolioArray = [];
  if (props.transaction.portfolio) {
    portfolioArray = props.transaction.portfolio;
  }
  return (
    <div>
      {portfolioArray.map(stock => (
        <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
      ))}
      <PurchaseStocks />
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Portfolio);
