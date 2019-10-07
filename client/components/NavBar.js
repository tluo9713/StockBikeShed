import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from 'material-ui';

const NavBar = props => {
  let { isLoggedIn, handleClick } = props;
  return (
    <div>
      {isLoggedIn ? (
        <div className="Navbar">
          <div className="NavbarLogo"> Stonks! </div>
          <div>
            <Link to="/profile">Profile</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/transaction">Transaction History</Link>
            <button onClick={handleClick}> Logout</button>
          </div>
        </div>
      ) : (
        <div className="Navbar">
          <div className="NavbarLogo"> Stonks! </div>
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
});

const mapDispatch = dispatch => ({
  handleClick: () => {
    localStorage.clear();
    dispatch(logout());
  },
});

export default connect(
  mapState,
  mapDispatch
)(NavBar);
