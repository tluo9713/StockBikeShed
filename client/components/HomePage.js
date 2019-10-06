import React from 'react';
import axios from 'axios';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }
  async handleSubmit() {
    let jesus = await axios.get('/auth/me');
    // let christ = await axios.get('/api/users');

    console.log(jesus);
    // console.log(christ);
  }
  render() {
    return (
      <div>
        <h1>HI I'm just starting!</h1>
        {/* <button onClick={this.handleSubmit}> Test</button> */}
      </div>
    );
  }
}
