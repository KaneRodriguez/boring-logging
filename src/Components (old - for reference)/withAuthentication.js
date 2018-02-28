import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';
import {getFirebase} from 'react-redux-firebase'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }

    componentDidMount() {
      getFirebase().auth().onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object,
  };

  return WithAuthentication;
}

export default withAuthentication;