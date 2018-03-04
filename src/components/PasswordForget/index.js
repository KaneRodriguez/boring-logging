import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        
        <TextField
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
      //id="password"
          label="email address"
          //className={classes.textField}
          type="text"
          //autoComplete="current-password"
          margin="normal"
          placeholder="Email Address"

        />
        <Button 
          variant="raised" 
          color="primary" 
          disabled={isInvalid} 
          type="submit"
        >
          Reset My Password
        </Button> 
        
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}
const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
