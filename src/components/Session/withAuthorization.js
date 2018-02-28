import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';
import {getFirebase} from 'react-redux-firebase'

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      getFirebase().auth().onAuthStateChanged(authUser => {
        if (!!!authUser) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return !!getFirebase().auth() ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
}

export default withAuthorization;