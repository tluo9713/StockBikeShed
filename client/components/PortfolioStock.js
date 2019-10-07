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
      const diff = Number.parseFloat(currentPrice - openPrice).toFixed(2);
      if (diff === 0) {
        stockPerformance = 'neutral';
      } else if (diff > 0) {
        stockPerformance = 'gain';
      } else {
        stockPerformance = 'loss';
      }
      this.setState({
        stock: Number.parseFloat(currentPrice).toFixed(2),
        status: stockPerformance,
        loaded: true,
        diff,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let { name, amount } = this.props;
    const { grabCurrentData } = this.props;

    return (
      <div className="stocks">
        <h1>Name: {name}</h1>
        <h2>amount: {amount}</h2>
        {this.state.loaded ? (
          <div>
            <h1>Current: {this.state.stock}</h1>
            <h1 className={this.state.status}>
              Evaluation: $
              {Number.parseFloat(this.state.stock * amount).toFixed(2)}
              {'daily change: $'}
              {this.state.diff}
            </h1>
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
