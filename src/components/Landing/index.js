import React, { Component } from 'react';
import { SignUpForm } from '../SignUp'
import { connect } from 'react-redux';

class LandingPage extends Component {

  render() {
    const { history, authUser } = this.props;

    return (
      <div>
        <h1>Free Soil Logging - Voice Automated Input</h1>
        { !authUser ? <SignUpForm history={history} /> : '' } 
        <p><b>Makes soil logging extremely easy and fast</b></p>
        <p> Gone are the days when soil logging required using wet, dirty, and cold hands to record soil information. </p>
        <p> With this application, you can use your voice to input all necessary soil information. The app keeps record of all your projects and your logs for easy access in the future. </p>
        <p> Built in GPS to mark all the boring locations and generate 2D and 3D soil profiles of all the logs in a project</p>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps, null)(LandingPage);
