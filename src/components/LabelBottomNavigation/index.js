import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import { connect } from 'react-redux';
import { db } from '../../firebase';

const styles = {
  root: {
    width: "100%",
    align: "left"
  },
};

class LabelBottomNavigation extends React.Component {

  render() {
    const { classes, selectedProjectKey, selectedBoringKey, onBottomNavigationMenuClicked } = this.props;

    // TODO: tie to some boolean / string that belongs to the projectsReducer

    let label = (selectedBoringKey ? "Borings" : (selectedProjectKey ? "Projects" : null))
    return (
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
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
});

const mapDispatchToProps = (dispatch) => ({
  onBottomNavigationMenuClicked: (backTo) => dispatch({ type: 'BOTTOM_NAV_BACK_CLICKED', backTo }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LabelBottomNavigation));
