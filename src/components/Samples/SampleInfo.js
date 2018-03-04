import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
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
            rimak: null,
        }
    }

  componentDidMount() {
    const { sample } = this.props;

    // we want a clone, not a copy of the reference
    let tmpSample = sample ? JSON.parse(JSON.stringify(sample)) : {title:''}    
  
    this.setState({tmpSample: tmpSample})
  }

  render() {
    const { samplesPath, onSelectBoringSample, classes, selectedBoringSampleKey, 
         firebase, onSetSampleDescDialogOpen } = this.props;    

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
    sampleDescDialogOpen: state.navState.sampleDescDialogOpen,
    selectedBoringSampleKey: state.projectState.selectedBoringSampleKey,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
    onSetSampleDescDialogOpen: (open) => dispatch({ type: 'SET_SAMPLE_DESC_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles) (SampleInfo));
