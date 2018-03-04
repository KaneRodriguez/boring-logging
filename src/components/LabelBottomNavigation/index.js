import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';

const styles = {
  root: {
    width: "100%",
    align: "left",
    bottom: '0px'
  },
};

class LabelBottomNavigation extends React.Component {

  render() {
    const { classes, selectedProjectKey, onSnackBarClose,
      selectedBoringKey, onBottomNavigationMenuClicked, geoLocationErrorMessage } = this.props;

    // TODO: tie to some boolean / string that belongs to the projectsReducer

    let label = (selectedBoringKey ? "Borings" : (selectedProjectKey ? "Projects" : null))
    return (
      <div>
      <BottomNavigation value={label} className={classes.root}>
        {label ?
          <BottomNavigationAction 
          label={label}
          value={label}
          icon={<ArrowBackIcon />} 
          onClick={(event)=> onBottomNavigationMenuClicked(label)}
          />
          : null }
      </BottomNavigation>
      <Snackbar
        //anchorOrigin={{'bottom', 'center' }}
        open={!!geoLocationErrorMessage}
        onClose={(event)=> onSnackBarClose(null)}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{geoLocationErrorMessage}</span>}
      />
      </div>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
  geoLocationErrorMessage: state.navState.geoLocationErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onBottomNavigationMenuClicked: (backTo) => dispatch({ type: 'BOTTOM_NAV_BACK_CLICKED', backTo }),
  onSnackBarClose: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LabelBottomNavigation));
