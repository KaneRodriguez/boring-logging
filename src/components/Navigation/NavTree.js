import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase, isLoaded } from 'react-redux-firebase'

import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper'
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  }),
});

class NavTree extends React.Component {

  render() {
    const { authUser, profile, selectedProjectKey, selectedBoringKey } = this.props
    const { classes } = this.props;

    let pathView = '';
    let pathHelp = '';

    if(profile.projects) {
        let project = profile.projects[selectedProjectKey]

        if(selectedProjectKey && project) {
            pathView = project.title
            
            if(selectedBoringKey && project.borings) {
                let boring = project.borings[selectedBoringKey]

                pathView += ' -> ' + boring.title

                pathHelp = `Try saying, "Create Sample" or "Create Strata", and view graphical data with the "Show Strata Plot" button.`
            } else {
                pathHelp = `Try saying, "Create Boring", or select info to set basic information, and click the folder to see samples and stratas.`
            }
        } else {
            pathHelp = 'Try saying, "Create project" or click the folder icon to see your project\'s borings.' 
        }
    } else {
      pathHelp = 'Try saying, "Create project" or click the folder icon to see your project\'s borings.' 
    }

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h4">
            {pathView}
          </Typography>
          <Typography component="p">
            {pathHelp}
          </Typography>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
});
  
const mapDispatchToProps = (dispatch) => ({
    onSetNavMenuAnchor: (anchorEl) => dispatch({ type: 'SET_NAV_MENU_ANCHOR', anchorEl })
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    withStyles(styles),
    connect(({ firebase: { profile } }) => ({ profile }))
  )(NavTree);