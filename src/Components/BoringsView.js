import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InteractiveList from './InteractiveList';

const styles = {
};

class BoringsView extends React.Component {
  state = {
  };
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="with-placeholder"
          label="New Boring"
          placeholder="Boring Name"
          className={classes.textField}
          margin="normal"
        />
        <h3>Saved Borings</h3>
        <hr />
        <InteractiveList items={this.props.borings}/>
      </div>
    );
  }
}

BoringsView.propTypes = {
  classes: PropTypes.object.isRequired,
  borings: PropTypes.array
};

export default withStyles(styles)(BoringsView);
