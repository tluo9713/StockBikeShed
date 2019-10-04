import React from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Portfolio from './Porfolio';
import Transactions from './Transactions';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>HI I'm just starting!</h1>
        {/* <SignUpPage />
        <Portfolio /> */}
        <Transactions />
      </div>
    );
  }
}
