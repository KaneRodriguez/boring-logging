import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import TextField from 'material-ui/TextField';
import {getFirebase} from 'react-redux-firebase'
import Button from 'material-ui/Button';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;
  // Sign In

  getFirebase().login({email: email, password: password}).then(() => {
    this.setState(() => ({ ...INITIAL_STATE }));
    history.push(routes.HOME);
  })
  .catch(error => {
    this.setState(updateByPropertyName('error', error));
  });

  // export const doSignInWithEmailAndPassword = (email, password) =>
  //   auth.signInWithEmailAndPassword(email, password);
  //   auth.doSignInWithEmailAndPassword(email, password)


    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="name"
          label="Email Address"
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          margin="normal"
        />

        <TextField
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          margin="normal"
        />

        <Button 
          variant="raised" 
          color="primary" 
          //disabled={isInvalid} 
          type="submit"
        >
          Sign In
        </Button>



        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
