import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import {geolocated} from 'react-geolocated';
import BoringInfoInputForms from './BoringInfoInputForms'
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
    const { boring } = this.props;

    let tmpBoring = JSON.parse(JSON.stringify(boring)); // we want a clone, not a copy of the reference

    this.setState({tmpBoring: tmpBoring})

    this.onAutoFillLocation = this.onAutoFillLocation.bind(this)
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

  render() {
    const { boringsPath, boring, classes, selectedBoringKey } = this.props
    const { firebase, onBoringInfoShow, showingBoringInfo, showingBoringSamples} = this.props;

    let updateBoring = (obj) => firebase.update(
        boringsPath + selectedBoringKey, 
        obj
    )

    let updateTmpBoring = (event, name) => {
        let tmpBoring = this.state.tmpBoring;
        tmpBoring[name] = event.target.value;
        this.setState({tmpBoring: tmpBoring})
    }

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
    selectedBoringKey: state.projectState.selectedBoringKey,
    showingBoringInfo: state.projectState.showingBoringInfo,
    showingBoringSamples: state.projectState.showingBoringSamples,
});

const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onGeoLocationFailed: (error) => dispatch({ type: 'SET_GEOLOCATION_FAILED', error }),
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
