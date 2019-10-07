import React from 'react';
import axios from 'axios';

class PortfolioStock extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }
  async componentDidMount() {
    await this.grabCurrentData();
  }
  async grabCurrentData() {
    const { name } = this.props;
    const url =
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    let topSecretApiKey = 'YIEAB87E08BESE7W';
    try {
      let res = await axios.get(`${url}${name}&apikey=${topSecretApiKey}`);
      console.log('portfolio,', res.data['Global Quote']);
      const currentPrice = res.data['Global Quote']['05. price'];
      const openPrice = res.data['Global Quote']['02. open'];
      console.log('portfolio,1', currentPrice, openPrice);
      let stockPerformance;
      if (currentPrice === openPrice) {
        stockPerformance = 'No Change';
      } else if (currentPrice > openPrice) {
        stockPerformance = 'Net Gain';
      } else {
        stockPerformance = 'Net Loss';
      }
      this.setState({
        stock: currentPrice,
        status: stockPerformance,
        loaded: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let { name, amount } = this.props;

    return (
      <div>
        <h1>Name: {name}</h1>
        <h2>amount: {amount}</h2>
        {this.state.loaded ? (
          <div>
            <h1>Current: {this.state.stock}</h1>
            <h1>Evaluation: {this.state.stock * amount}</h1>
            <h1>{this.state.status}</h1>
          </div>
        ) : (
          <h1>
            Loading (We are using a free API and are throttled by the amount of
            calls we can make, please refresh data again shortly
          </h1>
        )}
        <button onClick={this.grabCurrentData}>Refresh</button>
      </div>
    );
  }
}

export default PortfolioStock;
