import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InteractiveList from './InteractiveList';
import uuid from 'uuid';


const styles = {
};

class BoringsView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};

    this.addBoring = this.addBoring.bind(this);
    this.removeBoring = this.removeBoring.bind(this);
    this.selectBoring = this.selectBoring.bind(this);

    this.keyPress = this.keyPress.bind(this);
  }

  addBoring(boring) {
    this.props.addBoring(boring);
  }

  removeBoring(boring) {
    this.props.removeBoring(boring);
  }

  selectBoring(boring) {
    this.props.selectBoring(boring);
  }

  keyPress(e) {
    if(e.key === 'Enter' && e.target.value != "")
    {
      this.addBoring({
        id:uuid.v4(),
        title: e.target.value
      });
      e.target.value = '';
      e.preventDefault();
    }
  }

  render() {
    const { classes } = this.props;
    let listName = "Saved " + this.props.projectName + " Borings";

    return (
      <div className={classes.root}>
        <TextField
          id="with-placeholder"
          label="New Boring"
          placeholder="Boring Name"
          className={classes.textField}
          margin="normal"
          onKeyPress={this.keyPress}
        />
        <InteractiveList 
        listName={listName}
        items={this.props.borings}
        removeItem={this.removeBoring.bind(this)}
        selectItem={this.selectBoring.bind(this)}
        />
      </div>
    );
  }
}

BoringsView.propTypes = {
  classes: PropTypes.object.isRequired,
  borings: PropTypes.array
};

export default withStyles(styles)(BoringsView);
