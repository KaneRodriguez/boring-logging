import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firebaseConnect, withFirebase, isLoaded } from 'react-redux-firebase'

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import SignUpForm from './SignUpForm'

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};