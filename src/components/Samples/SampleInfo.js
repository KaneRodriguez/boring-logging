import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
// import GeoLocation from './GeoLocation'
import {geolocated} from 'react-geolocated';
// import BoringSampleDescription from './BoringSampleDescription'
import {getFirebase} from 'react-redux-firebase'
import { withFirebase } from 'react-redux-firebase'
import FullScreenDialog from '../Dialog'
import SampleInputList from './SampleInputList'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    display: 'block'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  fab: {
    position: 'relative',
    left: theme.spacing.unit * 2,
  },
});

class SampleInfo extends Component {

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
        onSelectBoringSample(null)
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
        <FullScreenDialog 
            title="Sample Description"
            fullScreen={true}
            open={this.props.sampleDescDialogOpen}
            onClose={(e)=> onCloseDialog()}
            onSave={(e)=> onSaveSampleDesc()}
            pageContent={
                <SampleInputList 
                    classes={classes}
                    handleChange={updateTmpSample}
                    sample={this.state.tmpSample}
                />
            }
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSamples: state.projectState.showingBoringSamples,
    authUser: state.sessionState.authUser,
    sampleDescDialogOpen: state.navState.sampleDescDialogOpen,
    selectedBoringSampleKey: state.projectState.selectedBoringSampleKey,
});

const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onBoringSampleDescShow: (showing) => dispatch({ type: 'BORING_SAMPLE_DESC_SHOW', showing }),
    onGeoLocationFailed: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
    onSetSampleDescDialogOpen: (open) => dispatch({ type: 'SET_SAMPLE_DESC_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps) (
    withStyles(styles)(
        geolocated({
            positionOptions: {
              enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
          })(SampleInfo)
    ));
