import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = props => {
  console.log(`you're in profile page`);
  console.log(props);
  return (
    <div>
      <h1>You are signed in</h1>
      <h1>{props.user.firstName}</h1>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(ProfilePage);
