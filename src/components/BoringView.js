import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';
import InteractiveList from './InteractiveList'
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
    state = {
        boring: {
            groundSurfaceElevationFt: 0,
            driller: '',
            engineer: '',
            latitude: 0,
            longitude: 0,
            samples: []
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

    this.addBoringSample = this.addBoringSample.bind(this)
    this.removeBoringSample = this.removeBoringSample.bind(this)
    this.selectBoringSample = this.selectBoringSample.bind(this)
    this.editBoringSampleTitle = this.editBoringSampleTitle.bind(this)
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

    addBoringSample(event) {
        const { authUser, selectedProjectKey, selectedBoringKey, onSetUserProjects } = this.props;

        // TODO: have button upon a dialogue instead?

        let newSample = {
            title: 'Click to enter project name'
        }

        db.doCreateBoringSample(authUser.uid, selectedProjectKey, selectedBoringKey, newSample).then((snapshot) => {
            db.onceGetUserProjects(authUser.uid).then(snapshot =>
                onSetUserProjects(snapshot.val())
            );      
        })
    }

    removeBoringSample(key) {
        const { authUser, onSetUserProjects, selectedProjectKey, selectedBoringKey } = this.props;
    
        console.log("removing", key)
        
        db.doRemoveBoringSample(authUser.uid, selectedProjectKey, selectedBoringKey, key).then((snapshot) => {
            db.onceGetUserProjects(authUser.uid).then(snapshot =>
                onSetUserProjects(snapshot.val())
            );      
        })
    }

    editBoringSampleTitle(key, title) {
        const { authUser, selectedProjectKey, selectedBoringKey, onSetUserProjects, projects } = this.props;
        
        if(projects[selectedProjectKey] 
          && projects[selectedProjectKey].borings 
          && projects[selectedProjectKey].borings[selectedBoringKey]
          && projects[selectedProjectKey].borings[selectedBoringKey].samples
          && projects[selectedProjectKey].borings[selectedBoringKey].samples[key]) {
          let boringSample = projects[selectedProjectKey].borings[selectedBoringKey].samples[key]
          boringSample.title = title;
    
          db.doUpdateProjectBoringSample(authUser.uid, selectedProjectKey, selectedBoringKey, key, boringSample).then((snapshot) => {
            db.onceGetUserProjects(authUser.uid).then(snapshot =>
              onSetUserProjects(snapshot.val())
            );      
          })
        }
      }

    selectBoringSample(key) {
        const { authUser, onSelectBoringSample } = this.props;
    
        console.log("selecting", key)
        
        onSelectBoringSample(key)
    }

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
                <InteractiveListWithAddButton 
                name={'Sample'}
                items={boring.samples}
                removeItem={this.removeBoringSample}
                selectItem={this.selectBoringSample}
                addItem={this.addBoringSample}
                classes={classes}
                editItemTitle={this.editBoringSampleTitle}
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

const InteractiveListWithAddButton = ({name, items, removeItem, selectItem, editItemTitle, addItem, classes}) =>
<div>
    <InteractiveList 
        listName={`Saved ${name}s`}
        items={items} 
        removeItem={removeItem}
        selectItem={selectItem}
        editItemTitle={editItemTitle}
    /> 
    <Button variant="fab" color='primary' onClick={addItem} className={classes.fab}>
        <AddIcon />
    </Button>
</div>

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
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
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
