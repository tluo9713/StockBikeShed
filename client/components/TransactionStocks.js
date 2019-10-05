import React from 'react';

const TransactionStocks = props => {
  let { ticker, shares, purchasePrice, createdAt } = props.transaction;
  let time = Date(Date.parse(createdAt));
  // console.log(test.toDateString());
  console.log('stocks', props);
  return (
    <div>
      <h1>Name: {ticker}</h1>
      <h2>shares: {shares}</h2>
      <h3>Price point: {purchasePrice / 100}</h3>
      <h4>Time : {time}</h4>
      <h4>Total payment: {(shares * purchasePrice) / 100}</h4>
    </div>
  );
};

export default TransactionStocks;
