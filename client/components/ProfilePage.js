import React from 'react';
import { connect } from 'react-redux';
import { getUserTransaction } from '../store/transaction';

class ProfilePage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log('mounting in profile page');
    this.props.grabTransactions(this.props.user);
  }

  render() {
    console.log(`you're in profile page`);
    console.log('profile page', this.props);

    return (
      <div>
        <h1>You are signed in</h1>
        <h1>{this.props.user.firstName}</h1>
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
