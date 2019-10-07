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
  grabCurrentData = async () => {
    console.log('clicked');
    const { name } = this.props;
    const url =
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    let topSecretApiKey = 'YIEAB87E08BESE7W';
    try {
      let res = await axios.get(`${url}${name}&apikey=${topSecretApiKey}`);
      const currentPrice = res.data['Global Quote']['05. price'];
      const openPrice = res.data['Global Quote']['02. open'];
      let stockPerformance;
      if (currentPrice === openPrice) {
        stockPerformance = 'No Change';
      } else if (currentPrice > openPrice) {
        stockPerformance = 'Net Gain';
      } else {
        stockPerformance = 'Net Loss';
      }
      console.log('open', openPrice);
      this.setState({
        stock: Number.parseFloat(currentPrice).toFixed(2),
        status: stockPerformance,
        loaded: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let { name, amount } = this.props;
    const { grabCurrentData } = this.props;

    return (
      <div>
        <h1>Name: {name}</h1>
        <h2>amount: {amount}</h2>
        {this.state.loaded ? (
          <div>
            <h1>Current: {this.state.stock}</h1>
            <h1>
              Evaluation: $
              {Number.parseFloat(this.state.stock * amount).toFixed(2)}
            </h1>
            <h1>{this.state.status}</h1>
          </div>
        ) : (
          <h1>
            Loading (We are using a free API and are throttled by the amount of
            calls we can make, please refresh data again shortly
          </h1>
        )}
        <h1 onClick={grabCurrentData}>Refresh Data</h1>
      </div>
    );
  }
}

export default PortfolioStock;
