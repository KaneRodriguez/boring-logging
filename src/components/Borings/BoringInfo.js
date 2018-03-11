import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import {geolocated} from 'react-geolocated';
import BoringInfoInputForms from './BoringInfoInputForms'
import FullScreenDialog from '../Dialog'
// import withVoiceRecognitionAI from '../VoiceRecognitionAI';
import annyang from 'annyang'

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
            groundSurfaceElevationFt: 0,
            driller: '',
            engineer: '',
            latitude: 0,
            longitude: 0,
        },
        commands: {}
    }

  componentDidMount() {
        const { boring } = this.props;

        let tmpBoring = JSON.parse(JSON.stringify(boring)); // we want a clone, not a copy of the reference

        this.setState({tmpBoring: tmpBoring})

        this.onAutoFillLocation = this.onAutoFillLocation.bind(this)

        if(annyang) {
            var commands = {
                'close (info page)': this.onCloseDialog,
                'save (info page)': this.onSaveSampleDesc,
                'change *target to *value': this.updateTmpBoringFromVoice,
                '*target is *value': this.updateTmpBoringFromVoice,
            }          
            console.log('mounting and annyang')
            annyang.addCommands(commands);

            this.setState({commands})
        }
    }

    componentWillUnmount() {
        if(annyang) {

            console.log('unmounting annyang')
            if(this.state.commands) {
                console.log('removing commands', Object.keys(this.state.commands))
                annyang.removeCommands(Object.keys(this.state.commands));
            }

            this.setState({commands: {}})
        }
    }

    updateTmpBoring = (key, value) => {
        let tmpBoring = this.state.tmpBoring;
        tmpBoring[key] = value;
        this.setState({tmpBoring: tmpBoring})
    }

    updateTmpBoringFromVoice = (target, value) => {
        switch(target.trim().toUpperCase()) {
            case 'GROUND SURFACE ELEVATION': case 'GROUND': case 'SURFACE':  case 'ELEVATION': {
                this.updateTmpBoring('groundSurfaceElevationFt', value)
                break;
            }
            case 'DRILLER': {
                console.log('updating driller to', value)
                this.updateTmpBoring('driller', value)
                break;
            }
            case 'ENGINEER': {
                this.updateTmpBoring('engineer', value)
                break;
            }
            case 'LATITUDE': {
                if(value.trim().toUpperCase() == "USE MY LOCATION" 
                    || value.trim().toUpperCase() == "USING MY LOCATION" ) {
                    this.onAutoFillLocation()
                }
                else {
                    this.updateTmpBoring('latitude', value)
                }
                break;
            }
            case 'LONGITUDE': {
                if(value.trim().toUpperCase() == "USE MY LOCATION"
                    || value.trim().toUpperCase() == "USING MY LOCATION") {
                    this.onAutoFillLocation()
                }
                else {
                    this.updateTmpBoring('longitude', value)
                }
                break;
            }
        }
    }

    updateTmpBoringFromEvent = (event, name) => {
        this.updateTmpBoring(name, event.target.value)
    }

  onAutoFillLocation(event) {
      const { onGeoLocationFailed } = this.props;

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
    onSaveSampleDesc = () => {
        this.updateBoring(this.state.tmpBoring)
        this.props.onBoringInfoShow(false)
    }

    onCloseDialog = () => {        
        this.setState({tmpBoring: {}})
        this.props.onSelectProjectBoring(null)
        this.props.onBoringInfoShow(false)
    }


    updateBoring = (obj) => this.props.firebase.update(
        this.props.boringsPath + this.props.selectedBoringKey, 
        obj
    )

  render() {
    const { boringsPath, boring, classes, selectedBoringKey } = this.props
    const { firebase, onBoringInfoShow, showingBoringInfo, showingBoringSamples} = this.props;


    return (
      <div>
        <FullScreenDialog 
            title="Boring Info"
            fullScreen={true}
            open={showingBoringInfo}
            onClose={this.onCloseDialog}
            onSave={this.onSaveSampleDesc}
            pageContent={
                <BoringInfoInputForms 
                    classes={classes}
                    handleChange={this.updateTmpBoringFromEvent}
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
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSamples: state.projectState.showingBoringSamples,
});

const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onGeoLocationFailed: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
    onSelectProjectBoring: (key) => dispatch({ type: 'USER_PROJECT_BORING_SELECT', key }),
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
