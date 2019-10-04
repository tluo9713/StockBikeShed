import React from 'react';
import PortfolioStock from './PortfolioStock';

export default class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = { stocks: [['MSFT', 100], ['APPL', 40]] };
  }
  //grab user info for stocks

  render() {
    let { stocks } = this.state;
    return (
      <div>
        {stocks.map(stock => (
          <PortfolioStock key={stock[0]} name={stock[0]} amount={stock[1]} />
        ))}
      </div>
    );
  }
}
