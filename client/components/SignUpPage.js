import React from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../store/user';

class SignUpPage extends React.Component {
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Retype Password:
              <input
                type="password"
                name="retypePassword"
                value={this.state.retypePassword}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <button disabled={this.state.passwordState}> Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const firstName = evt.target[0].value;
      const lastName = evt.target[1].value;
      const email = evt.target[2].value;
      const password = evt.target[3].value;

      dispatch(signUpUser(firstName, lastName, email, password, 'signup')).then(
        () => {
          ownProps.history.push('/profile');
        }
      );
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(SignUpPage);
