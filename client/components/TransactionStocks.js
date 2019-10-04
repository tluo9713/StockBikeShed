import React from 'react';

const TransactionStocks = props => {
  let { name, amount, purchasePrice, time } = props.transaction;

  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>amount: {amount}</h2>
      <h3>Price point: {purchasePrice}</h3>
      <h4>Time : {time}</h4>
      <h4>Total payment: {amount * purchasePrice}</h4>
    </div>
  );
};

export default TransactionStocks;
