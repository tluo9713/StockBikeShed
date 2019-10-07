import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/user';

class SignInPage extends React.Component {
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

  render() {
    let { handleSubmit } = this.props;
    let error;
    if (this.props.user) {
      error = this.props.user.error;
    }
    console.log('login', this.props.user);
    return (
      <div>
        <h1>Login page</h1>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label>
              UserName:
              <input
                type="text"
                name="username"
                value={this.state.username}
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
          <button> Log In</button>
        </form>
        {error && error.response && <div> {error.response.data} </div>}
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
      const email = evt.target[0].value;
      const password = evt.target[1].value;

      dispatch(auth(email, password, 'login')).then(() => {
        ownProps.history.push('/profile');
      });
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(SignInPage);
