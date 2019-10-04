import React from 'react';

const PortfolioStock = props => {
  let { name, amount } = props;

  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>amount: {amount}</h2>
    </div>
  );
};

export default PortfolioStock;
