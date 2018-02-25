import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';
import InteractiveList from './InteractiveList'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
// import GeoLocation from './GeoLocation'
import {geolocated} from 'react-geolocated';
import BoringInfo from './BoringInfo'

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
});
 
class BoringView extends Component {
    state = {
        boring: {
            groundSurfaceElevationFt: 0,
            driller: '',
            engineer: '',
            latitude: 0,
            longitude: 0
        }
    }

  componentDidMount() {
    const {selectedBoringKey, selectedProjectKey, projects} = this.props;

    let project = projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    this.state.boring = boring;

    this.saveBoringInfo = this.saveBoringInfo.bind(this)
    this.handleBoringInfoChange = this.handleBoringInfoChange.bind(this)
    this.onAutoFillLocation = this.onAutoFillLocation.bind(this)
  }

  saveBoringInfo(event) {
    const {authUser, selectedBoringKey, 
        selectedProjectKey, onSetUserProjects} = this.props;

    db.doUpdateProjectBoring(authUser.uid, selectedProjectKey, selectedBoringKey, this.state.boring)
    .then((event)=> {
        db.onceGetUserProjects(authUser.uid).then(snapshot =>
            onSetUserProjects(snapshot.val()) // TODO: in the future, add listeners to our database so this wont be necessary
        );    
    })   
  }

  onAutoFillLocation(event) {
      const {onGeoLocationFailed} = this.props;

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
        // TODO: dispatch success? Loading?
        this.setState({boring: {...this.state.boring, latitude: this.props.coords.latitude, longitude: this.props.coords.longitude}})
    }
  }

  handleBoringInfoChange = name => event => {
    this.setState({boring: {...this.state.boring, [name]: event.target.value}});
  };

  render() {
    const { classes, authUser, selectedBoringKey, selectedProjectKey, onBoringSampleDescShow, 
        onSetUserProjects, projects, onBoringInfoShow, showingBoringInfo,
    showingBoringSampleDescription} = this.props;

    let project = projects[selectedProjectKey]
    let boring = project.borings[selectedBoringKey]

    return (
      <div>
          {!!showingBoringInfo 
            ?
            <div>
                <h2>{project.title} : {boring.title} - Info</h2>
                <BoringInfo 
                classes={classes}
                onSave={this.saveBoringInfo}
                handleChange={this.handleBoringInfoChange}
                boring={this.state.boring}
                onAutoFillLocation={this.onAutoFillLocation}
                />
            </div>
            : !!showingBoringSampleDescription 
            ?
            <div>
                <h2>{project.title} : {boring.title} - Sample Desciption</h2>
                <BoringSampleDescription 
                classes={classes}
                onSave={this.saveBoringInfo}
                handleChange={this.handleBoringInfoChange}
                boring={this.state.boring}
                onAutoFillLocation={this.onAutoFillLocation}
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

const BoringSampleDescription = () =>
<div>Sample Desc </div>


const mapStateToProps = (state) => ({
    projects: state.projectState.projects,
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSampleDescription: state.projectState.showingBoringSampleDescription,
    authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUserProjects: (projects) => dispatch({ type: 'USER_PROJECTS_SET', projects }),
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onBoringSampleDescShow: (showing) => dispatch({ type: 'BORING_SAMPLE_DESC_SHOW', showing }),
    onGeoLocationFailed: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
});

export default connect(mapStateToProps, mapDispatchToProps) (
    withStyles(styles)(
        geolocated({
            positionOptions: {
              enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
          })(BoringView)
    ));
