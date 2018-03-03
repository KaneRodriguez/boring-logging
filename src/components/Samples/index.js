import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {InteractiveList, InteractiveListWithAddButton} from '../InteractiveList'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
// import GeoLocation from './GeoLocation'
import {geolocated} from 'react-geolocated';
import FullScreenDialog from '../Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List';
import SampleInputList from './SampleInputList'
import SampleInfo from './SampleInfo'

class Samples extends Component {
    state = {
        tmpSample: {
            title: '',
            top: null,
            bottom: null,
            spt: null,
            pocketPen: null,
            rimak: null
        }
    }

  componentDidMount() {
    const { profile, selectedBoringKey, selectedProjectKey, selectedBoringSampleKey } = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]
    let sample = selectedBoringSampleKey ? boring.samples[selectedBoringSampleKey] : null
    
    // we want a clone, not a copy of the reference
    let tmpSample = sample ? JSON.parse(JSON.stringify(sample)) : {title:''}    
  
    this.setState({tmpSample: tmpSample})
    }
    
  render() {
    const { authUser, onSelectBoringSample, profile, classes, selectedBoringKey, selectedBoringSampleKey, 
        selectedProjectKey, firebase, onSetSampleDescDialogOpen, onSetStrataDialogOpen } = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]
    let selectedSample = boring.samples ? boring.samples[selectedBoringSampleKey] : null

    let projectsPath = `users/${authUser.uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`
    let samplesPath = boringsPath + `${selectedBoringKey}/samples/`

    const updateBoringSample = (sample) => {
        if(selectedBoringSampleKey) {
            firebase.update(
                samplesPath + selectedBoringSampleKey, 
                sample
            )
        } else {
            // this is a new one
            firebase.push(
                samplesPath, 
                sample ? sample : {title: 'Click Here to Change Title'}
            )
        }
    }

    const updateBoringSampleWithKey = (key, sample) => {
        firebase.update(
            samplesPath + key, 
            sample
        )
    }

    let updateTmpSample = (event, name) => {
        let tmpSample = this.state.tmpSample;
        tmpSample[name] = event.target.value;
        this.setState({tmpSample: tmpSample})
    }

    const onCloseDialog = () => {
        this.setState({tmpSample: {}})
        onSetSampleDescDialogOpen(false)
    }
    const onSaveSampleDesc = () => {
        updateBoringSample(this.state.tmpSample)
        onCloseDialog()
    }
    const removeBoringSample = (key) => firebase.remove(
        samplesPath + key)

    const boringSampleSelected = (key) => {
        onSelectBoringSample(key)
        onSetSampleDescDialogOpen(true)
    }
    return (
      <div>
            <InteractiveListWithAddButton 
            name={'Sample'}
            items={boring.samples}
            removeItem={removeBoringSample}
            selectItem={(key)=> boringSampleSelected(key)}
            addItem={(e) => onSetSampleDescDialogOpen(true)}
            classes={classes}
            editItemTitle={(key, title)=> updateBoringSampleWithKey(key, {title: title})}
            />
            { this.props.sampleDescDialogOpen
                ? <SampleInfo
                    classes={classes}
                    firebase={firebase}
                    profile={profile}
                />
                : null 
            }

            {/* <FullScreenDialog 
                title="Strata"
                open={this.props.strataDialogOpen}
                onClose={(e)=> onSetStrataDialogOpen(false)}
                onSave={(e)=> onSaveStrata()}
                pageContent={
                    <StrataInputList 
                        classes={classes}
                        handleChange={updateNewStrata}
                        sample={selectedBoringSampleKey ? selectedStrata : this.state.newSampleStrata}
                    />
                }
            /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
    selectedBoringSampleKey: state.projectState.selectedBoringSampleKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSamples: state.projectState.showingBoringSamples,
    authUser: state.sessionState.authUser,
    sampleDescDialogOpen: state.navState.sampleDescDialogOpen,
    strataDialogOpen: state.navState.strataDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
    onSetSampleDescDialogOpen: (open) => dispatch({ type: 'SET_SAMPLE_DESC_DIALOG_OPEN', open }),
    onSetStrataDialogOpen: (open) => dispatch({ type: 'SET_STRATA_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
