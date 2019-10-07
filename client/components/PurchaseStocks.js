import React from 'react';
import { connect } from 'react-redux';
import { createNewTransaction } from '../store/transaction';

class PurchaseStocks extends React.Component {
  constructor() {
    super();
    this.state = { ticker: '', amount: 0 };
  }

  componentDidUpdate(prevProps) {
    console.log('updated', this.props.transaction);
    console.log('statement');
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value.toUpperCase();
    this.setState({ [name]: value });
  };

  render() {
    let funds;
    const userId = this.props.user.id;
    if (userId) {
      funds = this.props.funds;
    }
    let { transact } = this.props;
    let handleSubmit;
    if (userId) {
      handleSubmit = transact(userId);
    }
    console.log('purchasestockscomponent', funds);
    return (
      <div>
        <div key={'funds'}>{funds ? <h2>Cash Money : {funds}</h2> : ''}</div>

        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label>
              Ticker Name:
              <input
                type="text"
                name="ticker"
                value={this.state.ticker}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Stock Amount:
              <input
                type="text"
                name="amount"
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </label>
            <button> Purchase</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
  funds: state.funds || 0,
});

const mapDispatch = dispatch => ({
  transact: userId => event => {
    event.preventDefault();
    console.log(event.target);

    const ticker = event.target[0].value;
    const shares = event.target[1].value;
    console.log(ticker, shares);
    dispatch(createNewTransaction(ticker, shares, userId));
  },
});

export default connect(
  mapState,
  mapDispatch
)(PurchaseStocks);
