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
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
      firebase
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
       // db.doCreateUser(authUser.uid, username, email)
       firebase.update(`users/${authUser.uid}`, {username: username, email: email})
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          value={username}
          label="Full Name"
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
          margin="normal"

        />
        <TextField
          value={email}
          label="Email Address"
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
          margin="normal"

        />
        <TextField
          value={passwordOne}
          label="Password"
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
          margin="normal"

        />
        <TextField
          value={passwordTwo}
          label="Confirm Password"
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
          margin="normal"

        />

        <Button 
          variant="raised" 
          color="primary" 
          //disabled={isInvalid} 
          type="submit"
        >
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}
export default compose(
    withFirebase,
    connect(({ firebase: { profile } }) => ({ profile }))
  )(SignUpForm);