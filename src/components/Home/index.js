import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase, isLoaded } from 'react-redux-firebase'

import withAuthorization from '../Session/withAuthorization';
import { CircularProgress } from 'material-ui/Progress';
import Projects from '../Projects'
import {NavTree} from '../Navigation'
import SimpleTable from '../SimpleTable'

class HomePage extends Component {

  render() {
    const { profile } = this.props;

    return (
      <div>
        <NavTree />
        <SimpleTable />
        {
          isLoaded(profile)
          ? <Projects />
          : <CircularProgress  size={50} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, null),
  withFirebase,
  connect(({ firebase: { profile } }) => ({ profile }))
)(HomePage);