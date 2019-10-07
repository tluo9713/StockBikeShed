import React from 'react';

const TransactionStocks = props => {
  let { ticker, shares, purchasePrice, createdAt } = props.transaction;
  let time = Date(Date.parse(createdAt));
  return (
    <tr className="stocks">
      <td>{ticker}</td>
      <td>{shares}</td>
      <td>${Number.parseFloat(purchasePrice / 100000).toFixed(2)}</td>
      <td>
        ${Number.parseFloat((shares * purchasePrice) / 100000).toFixed(2)}
      </td>
      <td>{time}</td>
    </tr>
  );
};

export default TransactionStocks;
