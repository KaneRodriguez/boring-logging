import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';
import {InteractiveList, InteractiveListWithAddButton} from './InteractiveList'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
// import GeoLocation from './GeoLocation'
import {geolocated} from 'react-geolocated';
import BoringInfo from './BoringInfo'
import FullScreenDialog from './FullScreenDialog'

class BoringSampleDescription extends Component {

  render() {
    const { authUser, onSelectBoringSample, profile, classes, selectedBoringKey, selectedProjectKey, firebase } = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    let projectsPath = `users/${authUser.uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`
    let samplesPath = boringsPath + `${selectedBoringKey}/samples/`

    const updateBoringSample = (key, sample) => firebase.update(
        samplesPath + key, 
        sample
    )

    const addBoringSample = () => firebase.push(
        samplesPath, 
        {title: 'Click Here to Change Title'}
    )

    const removeBoringSample = (key) => firebase.remove(
        samplesPath + key)

    return (
      <div>
        BoringSampleDescription
        <h2>{project.title} : {boring.title} - Sample Desciption</h2>
            <InteractiveListWithAddButton 
            name={'Sample'}
            items={boring.samples}
            removeItem={removeBoringSample}
            selectItem={(key)=> onSelectBoringSample(key)}
            addItem={addBoringSample}
            classes={classes}
            editItemTitle={(key, title)=> updateBoringSample(key, {title: title})}
            />
            <FullScreenDialog />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSampleDescription: state.projectState.showingBoringSampleDescription,
    authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoringSampleDescription)
