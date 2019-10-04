import React from 'react';
import Transactions from './Transactions';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Link to="/portfolio">Porfolio</Link>
        <Link to="/transaction">Transaction History</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>

        <h1>HI I'm just starting!</h1>
        {/* <SignUpPage />
        <Portfolio /> */}
        {/* <Transactions /> */}
      </div>
    );
  }
}
