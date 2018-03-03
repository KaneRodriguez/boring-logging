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
import BoringInfoInputForms from './BoringInfoInputForms'
// import BoringSampleDescription from './BoringSampleDescription'
import {getFirebase} from 'react-redux-firebase'
import { withFirebase } from 'react-redux-firebase'
import FullScreenDialog from '../Dialog'
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

class BoringInfo extends Component {

    state = {
        tmpBoring: {
            groundSurfaceElevationFt: null,
            driller: null,
            engineer: null,
            latitude: null,
            longitude: null,
        }
    }

  componentDidMount() {
    const { profile, selectedBoringKey, selectedProjectKey } = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    let tmpBoring = JSON.parse(JSON.stringify(boring)); // we want a clone, not a copy of the reference

    this.setState({tmpBoring: tmpBoring})

    this.onAutoFillLocation = this.onAutoFillLocation.bind(this)
    this.selectBoringSample = this.selectBoringSample.bind(this)
  }

  onAutoFillLocation(event) {
      const {authUser, firebase, selectedProjectKey, selectedBoringKey, onGeoLocationFailed} = this.props;

    // with geolocation we have access to:
    // this.props.coords.latitude  
    // this.props.coords.longitude 
    // this.props.coords.altitude  
    // this.props.coords.heading   
    // this.props.coords.speed     
    // ...and possibly more...

    if(!this.props.isGeolocationAvailable) {
        onGeoLocationFailed('Your browser does not support Geolocation')
    } else if(!this.props.isGeolocationEnabled) {
        onGeoLocationFailed('Geolocation is not enabled')
    }
    else {
        let tmpBoring = this.state.tmpBoring;
        tmpBoring.latitude = this.props.coords.latitude
        tmpBoring.longitude = this.props.coords.longitude

        this.setState({tmpBoring: tmpBoring})

    }
  }

    selectBoringSample(key) {
        const { onSelectBoringSample } = this.props;
            
        onSelectBoringSample(key)
    }

  render() {
    const { authUser, profile, classes, selectedBoringKey, selectedProjectKey, onBoringSampleDescShow, 
        onSetUserProjects, firebase, onBoringInfoShow, showingBoringInfo,
    showingBoringSamples} = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    let projectsPath = `users/${authUser.uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`
    let samplesPath = boringsPath + `${selectedBoringKey}/samples/`

    // TODO: only allow a change if enter key is pressed? 
    let updateBoring = (obj) => firebase.update(
        boringsPath + selectedBoringKey, 
        obj
    )

    let updateTmpBoring = (event, name) => {
        let tmpBoring = this.state.tmpBoring;
        tmpBoring[name] = event.target.value;
        this.setState({tmpBoring: tmpBoring})
    }

    let updateBoringSample = (key, sample) => firebase.update(
        samplesPath + key, 
        sample
    )

    let addBoringSample = () => firebase.push(
        samplesPath, 
        {title: 'Click Here to Change Title'}
    )
    let removeBoringSample = (key) => firebase.remove(
        samplesPath + key)

    let onSaveSampleDesc = () => {
        updateBoring(this.state.tmpBoring)
        onBoringInfoShow(false)
    }

    let onCloseDialog = () => {        
        this.setState({tmpBoring: {}})
        onBoringInfoShow(false)
    }

    return (
      <div>
        <FullScreenDialog 
            title="Boring Info"
            fullScreen={true}
            open={showingBoringInfo}
            onClose={(e)=> onCloseDialog()}
            onSave={(e)=> onSaveSampleDesc()}
            pageContent={
                <BoringInfoInputForms 
                    classes={classes}
                    handleChange={updateTmpBoring}
                    boring={this.state.tmpBoring}
                    onAutoFillLocation={this.onAutoFillLocation}
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
    authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onBoringSampleDescShow: (showing) => dispatch({ type: 'BORING_SAMPLE_DESC_SHOW', showing }),
    onGeoLocationFailed: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
});

export default connect(mapStateToProps, mapDispatchToProps) (
    withStyles(styles)(
        geolocated({
            positionOptions: {
              enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
          })(BoringInfo)
    ));
