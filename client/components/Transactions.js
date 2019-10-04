import React from 'react';
import TransactionStocks from './TransactionStocks';

export default class Tranctions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [
        { name: 'MSFT', amount: '50', purchasePrice: '400', time: '5oclock' },
        { name: 'APPL', amount: '50', purchasePrice: '400', time: '4oclock' },
        { name: 'MSFT', amount: '40', purchasePrice: '500', time: '3oclock' },
      ],
    };
  }
  //grab user info for stocks

  render() {
    let { transactions } = this.state;
    return (
      <div>
        {transactions.map((transaction, index) => (
          <TransactionStocks key={index} transaction={transaction} />
        ))}
      </div>
    );
  }
}
