import React from 'react';

const TransactionStocks = props => {
  let { ticker, shares, purchasePrice, createdAt } = props.transaction;
  let time = Date(Date.parse(createdAt));
  return (
    <div className="stocks">
      <h1>Ticker Name: {ticker}</h1>
      <h2>Shares Purchased: {shares}</h2>
      <h3>
        Purchase Price: ${Number.parseFloat(purchasePrice / 100000).toFixed(2)}
      </h3>
      <h3>
        Total payment: $
        {Number.parseFloat((shares * purchasePrice) / 100000).toFixed(2)}
      </h3>
      <h4>Time : {time}</h4>
    </div>
  );
};

export default TransactionStocks;
