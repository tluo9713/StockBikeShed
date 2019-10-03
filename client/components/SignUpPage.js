import React from 'react';

export default class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      email: '',
      lastName: '',
      password: '',
      retypePassword: '',
      passwordState: true,
    };
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    let newState = true;
    if (name === 'retypePassword' && value === this.state.password) {
      newState = false;
    }
    this.setState({ [name]: value, passwordState: newState });
  };
  handleSubmit = event => {
    event.preventDefault();
    //redux for sign up stuff here
  };

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
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
          <label>
            Type Password Again:
            <input
              type="password"
              name="retypePassword"
              value={this.state.retypePassword}
              onChange={this.handleChange}
            />
          </label>
          <button disabled={this.state.passwordState}> Sign Up</button>
        </form>
      </div>
    );
  }
}
