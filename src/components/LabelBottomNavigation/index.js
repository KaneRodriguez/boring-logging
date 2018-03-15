import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Snackbar from 'material-ui/Snackbar';
import VoiceHint from '../VoiceRecognitionAI/VoiceHint'
import { connect } from 'react-redux';

const styles = {
  root: {
    width: "100%",
    align: "left",
    bottom: '0px',
    position: 'fixed',
  },
};

class LabelBottomNavigation extends React.Component {

  render() {
    const { classes, selectedProjectKey, onSnackBarClose,
      selectedBoringKey, onBottomNavigationMenuClicked, errorMessage } = this.props;

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
          <VoiceHint />
      </BottomNavigation>
      <Snackbar
        //anchorOrigin={{'bottom', 'center' }}
        open={!!errorMessage}
        onClose={(event)=> onSnackBarClose(null)}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMessage}</span>}
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
  errorMessage: state.navState.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onBottomNavigationMenuClicked: (backTo) => dispatch({ type: 'BOTTOM_NAV_BACK_CLICKED', backTo }),
  onSnackBarClose: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LabelBottomNavigation));
