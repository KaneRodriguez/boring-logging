import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InteractiveList from './InteractiveList';
import uuid from 'uuid';

const styles = {
};

class ProjectsView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};

    this.addProject = this.addProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.selectProject = this.selectProject.bind(this);

    this.keyPress = this.keyPress.bind(this);
  }

  addProject(project) {
    this.props.addProject(project);
  }

  removeProject(project) {
    this.props.removeProject(project);
  }

  selectProject(project) {
    this.props.selectProject(project);
  }

  keyPress(e) {
    if(e.key === 'Enter' && e.target.value != "")
    {
      this.addProject({
        id:uuid.v4(),
        title: e.target.value,
        borings: []
      });
      e.target.value = '';
      e.preventDefault();
    }
  }

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
          onKeyPress={this.keyPress}
        />
        <InteractiveList 
        listName="Saved Projects"
        items={this.props.projects} 
        removeItem={this.removeProject.bind(this)}
        selectItem={this.selectProject.bind(this)}
        />
      </div>
    );
  }
}

ProjectsView.propTypes = {
  classes: PropTypes.object.isRequired,
  addProject: PropTypes.func,
  selectProject: PropTypes.func,
  keyPress: PropTypes.func,
  projects: PropTypes.array
};

export default withStyles(styles)(ProjectsView);
