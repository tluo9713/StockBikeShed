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
    <div className="PortfolioPage">
      <div className="StockContainer">
        {portfolioArray.map(stock => (
          <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
        ))}
      </div>
      <div className="purchaseContainer">
        <PurchaseStocks />
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

export default connect(mapState)(Portfolio);
