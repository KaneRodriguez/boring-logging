import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InteractiveList from './InteractiveList';

const styles = {
};

class ProjectsView extends React.Component {
  state = {
  };
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="with-placeholder"
          label="New Project"
          placeholder="Project Name"
          className={classes.textField}
          margin="normal"
        />
        <h3>Saved Projects</h3>
        <hr />
        <InteractiveList />
      </div>
    );
  }
}

ProjectsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsView);
