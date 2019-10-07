import React from 'react';
import axios from 'axios';

class PortfolioStock extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
    this.grabCurrentData = this.grabCurrentData.bind(this);
  }
  async componentDidMount() {
    await this.grabCurrentData();
  }
  async grabCurrentData(event) {
    if (event) {
      event.preventDefault();
    }
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
      if (diff == 0) {
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
  }

  render() {
    let { name, amount } = this.props;
    const { grabCurrentData } = this;

    return (
      <tr className="stocks">
        <td>{name}</td>
        <td>amount: {amount}</td>
        {this.state.loaded ? (
          <>
            <td>{this.state.stock}</td>
            <td className={this.state.status}>
              ${Number.parseFloat(this.state.stock * amount).toFixed(2)}
            </td>
            <td className={this.state.status}>{this.state.diff}</td>
          </>
        ) : (
          <>
            <td>
              We are using a free API and are throttled by the amount of calls
              we can make.Please refresh data again shortly.
            </td>
            <td></td>
            <td></td>
          </>
        )}
        <td>
          <button onClick={grabCurrentData}>Refresh Data</button>
        </td>
      </tr>
    );
  }
}

export default PortfolioStock;
