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
    return (
      <div>
        <div className="welcome">
          <h1>Welcome {this.props.user.firstName}!</h1>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
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
