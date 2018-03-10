import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {compose} from 'recompose'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import LabelBottomNavigation from '../LabelBottomNavigation'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'

import './index.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
  }),
});

class App extends React.Component {
  render() {
    const {classes} = this.props
    
    return(
      <Router>
        <div className="app">
          <Navigation />

          <Paper className={classes.root} elevation={2}>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          </Paper>
          <LabelBottomNavigation />
        </div>
      </Router>);
  }
}

export default compose(
  withAuthentication,
  withStyles(styles)
)(App);