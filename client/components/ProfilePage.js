import React from 'react';
import { connect } from 'react-redux';
import { getUserTransaction } from '../store/transaction';

class ProfilePage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { user } = this.props;
    if (user.id) {
      this.props.grabTransactions(this.props.user);
    }
  }

  render() {
    const { user } = this.props;
    console.log(this.props);
    return (
      <div>
        {user.id ? (
          <div>
            <h1>You are signed in</h1>
            <h1>{this.props.user.firstName}</h1>
          </div>
        ) : (
          <h1>NOTLOGGEDIN</h1>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  transaction: state.transaction || {},
});

const mapDispatch = dispatch => {
  return {
    grabTransactions(user) {
      dispatch(getUserTransaction(user.id));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ProfilePage);
