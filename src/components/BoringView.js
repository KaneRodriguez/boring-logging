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
import SampleFormDialog from './SampleFormDialog'

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
 
class BoringView extends Component {

  componentDidMount() {
    const {firebase, profile, selectedBoringKey, selectedProjectKey, projects} = this.props;

    this.onAutoFillLocation = this.onAutoFillLocation.bind(this)

    this.selectBoringSample = this.selectBoringSample.bind(this)
  }

  onAutoFillLocation(event) {
      const {firebase, selectedProjectKey, selectedBoringKey, onGeoLocationFailed} = this.props;

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
        firebase.update(
            `users/${firebase.auth().uid}/projects/${selectedProjectKey}/borings/${selectedBoringKey}`, 
            { latitude: this.props.coords.latitude, longitude: this.props.coords.longitude}
        )
    }
  }

    selectBoringSample(key) {
        const { onSelectBoringSample } = this.props;
            
        onSelectBoringSample(key)
    }

  render() {
    const { profile, classes, selectedBoringKey, selectedProjectKey, onBoringSampleDescShow, 
        onSetUserProjects, firebase, onBoringInfoShow, showingBoringInfo,
    showingBoringSampleDescription} = this.props;

    let project = profile.projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    let projectsPath = `users/${firebase.auth().uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`
    let samplesPath = boringsPath + `${selectedBoringKey}/samples/`

    // TODO: only allow a change if enter key is pressed? 
    const updateBoring = (event, name) => firebase.update(
        boringsPath + selectedBoringKey, 
        {[name]: event.target.value}
    )

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
          {!!showingBoringInfo 
            ?
            <div>
                <h2>{project.title} : {boring.title} - Info</h2>
                <BoringInfo 
                classes={classes}
                handleChange={updateBoring}
                boring={boring}
                onAutoFillLocation={this.onAutoFillLocation}
                />
            </div>
            : !!showingBoringSampleDescription 
            ?
            <div>
                <h2>{project.title} : {boring.title} - Sample Desciption</h2>
                <InteractiveListWithAddButton 
                name={'Sample'}
                items={boring.samples}
                removeItem={removeBoringSample}
                selectItem={this.selectBoringSample}
                addItem={addBoringSample}
                classes={classes}
                editItemTitle={(key, title)=> updateBoringSample(key, {title: title})}
                />
            </div>
            :
            <div>
                <h2>{project.title} : {boring.title}</h2>
                <Button 
                color="primary"
                className={classes.button}
                onClick={(event)=> onBoringInfoShow(true)}
                variant="raised"
                >
                 Boring Info
                </Button>
                <Button 
                color="primary"
                className={classes.button}
                onClick={(event)=> onBoringSampleDescShow(true)}
                variant="raised">
                 Sample Description
                </Button>
            </div>
            }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSampleDescription: state.projectState.showingBoringSampleDescription,
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
          })(BoringView)
    ));
