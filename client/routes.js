import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { me } from './store';

import SignUpPage from './components/SignUpPage';
import Transaction from './components/Transactions';
import Portfolio from './components/Porfolio';
import ProfilePage from './components/ProfilePage';
import LogInPage from './components/LogInPage';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={LogInPage} />
        <Route path="/signup" component={SignUpPage} />
        {/* You shouldn't access these routes unless you're logged in */}
        {isLoggedIn && (
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transaction" component={Transaction} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {<Route component={LogInPage} />}
        {<Route component={SignUpPage} />}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
