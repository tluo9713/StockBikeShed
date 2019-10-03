import React from 'react';

export default class SignInPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    //redux for login stuff here
  };

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <form>
          <label>
            UserName:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button> Log In</button>
        </form>
      </div>
    );
  }
}
