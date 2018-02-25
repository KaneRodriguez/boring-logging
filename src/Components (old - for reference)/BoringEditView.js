import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InteractiveList from './InteractiveList';
import uuid from 'uuid';
import Typography from 'material-ui/Typography'


const styles = {
};

class BoringEditView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>
            {this.props.projectName} : {this.props.boring.title}
        </Typography>
      </div>
    );
  }
}

BoringEditView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoringEditView);
