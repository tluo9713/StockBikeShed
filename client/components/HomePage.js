import React from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>HI I'm just starting!</h1>
        <SignUpPage />
      </div>
    );
  }
}
