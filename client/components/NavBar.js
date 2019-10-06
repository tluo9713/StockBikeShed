import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';

const NavBar = props => {
  let { isLoggedIn, handleClick } = props;
  let firstname = props.user.firstname;
  console.log('navbar', isLoggedIn);
  return (
    <div>
      THIS IS THE NAVBAR
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <button onClick={handleClick}> Logout</button>
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
