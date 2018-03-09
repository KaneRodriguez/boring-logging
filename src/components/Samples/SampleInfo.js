import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import FullScreenDialog from '../Dialog'
import SampleInputList from './SampleInputList'
import annyang from 'annyang'
import wordsToNumbers from 'words-to-numbers';

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
            top: 0,
            bottom: 0,
            sptOne: 0,
            sptTwo: 0,
            sptThree: 0,
            pocketPenOne: 0,
            pocketPenTwo: 0,
            pocketPenThree: 0,
            rimak: 0,
        },
        commands: {}
    }

  componentDidMount() {
    const { sample } = this.props;

    // we want a clone, not a copy of the reference
    let tmpSample = sample ? JSON.parse(JSON.stringify(sample)) : {title:''}    
  
    this.setState({tmpSample: tmpSample})

        if(annyang) {
            var commands = {
            '*target is *value': this.updateTmpSampleFromVoice,
            'change *target to *value': this.updateTmpSampleFromVoice,
            'change title to *value': (value)=> this.updateTmpSampleFromVoice('TITLE', wordsToNumbers(value, {fuzzy: true})),
            'change top to *value': (value)=> this.updateTmpSampleFromVoice('TOP', wordsToNumbers(value, {fuzzy: true})),
            'change bottom to *value': (value)=> this.updateTmpSampleFromVoice('BOTTOM', wordsToNumbers(value, {fuzzy: true})),
            'change PP 1 to *value': (value)=> this.updateTmpSampleFromVoice('PP 1', wordsToNumbers(value, {fuzzy: true})),
            'change PP 1 2 *value': (value)=> this.updateTmpSampleFromVoice('PP 1', wordsToNumbers(value, {fuzzy: true})),
            'change PP 2 to *value': (value)=> this.updateTmpSampleFromVoice('PP 2', wordsToNumbers(value, {fuzzy: true})),
            'change PP 3 to *value': (value)=> this.updateTmpSampleFromVoice('PP 3', wordsToNumbers(value, {fuzzy: true})),
            'change SPT-1 to *value': (value)=> this.updateTmpSampleFromVoice('SPT-1', wordsToNumbers(value, {fuzzy: true})),
            'change SPT-2 to *value': (value)=> this.updateTmpSampleFromVoice('SPT-2', wordsToNumbers(value, {fuzzy: true})),
            'change SPT-3 to *value': (value)=> this.updateTmpSampleFromVoice('SPT-3', wordsToNumbers(value, {fuzzy: true})),
            'change Rimak to *value': (value)=> this.updateTmpSampleFromVoice('rimak', wordsToNumbers(value, {fuzzy: true})),
            'change recovery to *value': (value)=> this.updateTmpSampleFromVoice('recovery', wordsToNumbers(value, {fuzzy: true})),
            }          
            console.log('mouting and annyang')
            annyang.addCommands(commands);

            this.setState({commands})
        }
    }

    componentWillUnmount() {
        if(annyang) {

            console.log('unmounting and annyang')
            if(this.state.commands) {
                console.log('removing commands', Object.keys(this.state.commands))
                annyang.removeCommands(Object.keys(this.state.commands));
            }

            this.setState({commands: {}})
        }
    }

    updateTmpSampleFromVoice = (target, value) => {
        switch(target.trim().toUpperCase()) {
            case 'TITLE': {
                this.updateTmpSample('title', value)
                break;
            }
            case 'TOP': case 'TIME': {
                this.updateTmpSample('top', value)
                break;
            }
            case 'SPT-1': case 'SPT 1': {
                this.updateTmpSample('sptOne', value)
                break;
            }
            case 'SPT-2': case 'SPT 2': {
                this.updateTmpSample('sptTwo', value)
                break;
            }
            case 'SPT-3': case 'SPT 3': {
                this.updateTmpSample('sptThree', value)
                break;
            }
            case 'BOTTOM': {
                this.updateTmpSample('bottom', value)
                break;
            }
            case 'PP 1': case 'PP ONE':  case 'PT 1':{
                this.updateTmpSample('pocketPenOne', value)
                break;
            }
            case 'PP 2': case 'PP TWO': case 'PT 2':{
                this.updateTmpSample('pocketPenTwo', value)
                break;
            }
            case 'PP 3': case 'PP THREE': case 'PT 3':{
                this.updateTmpSample('pocketPenThree', value)
                break;
            }
            case 'SPT': {
                if(value < 999) {
                    var ones = Math.floor(value % 10),
                    tens = Math.floor(value/10 % 10),
                    hundreds = Math.floor(value/100 % 10)

                    this.updateTmpSample('sptOne', hundreds)
                    this.updateTmpSample('sptTwo', tens)
                    this.updateTmpSample('sptThree', ones)
                }
                break;
            }
            case 'POCKET PEN': case 'PAKISTAN': case 'POCKET PATTERN': case 'POCKET': case 'PEN': {
                if(value < 999) {
                    var ones = Math.floor(value % 10),
                    tens = Math.floor(value/10 % 10),
                    hundreds = Math.floor(value/100 % 10)

                    this.updateTmpSample('pocketPenOne', hundreds)
                    this.updateTmpSample('pocketPenTwo', tens)
                    this.updateTmpSample('pocketPenThree', ones)
                }
                break;
            }
            // rimak is hard for the ai to understand?
            case 'RIMAK': case 'REMAC': case 'REMOC': case 'MY MAC': case 'MAC': case 'REACT':  case 'REMAX': {
                this.updateTmpSample('rimak', value)
                break;
            }
            case 'RECOVERY': {
                this.updateTmpSample('recovery', value)
                break;
            }
        }
    }

    updateTmpSampleFromEvent = (event, name) => {
        this.updateTmpSample(name, event.target.value)
    }

    updateTmpSample = (key, value) => {
        let tmpSample = this.state.tmpSample;
        tmpSample[key] = value;
        this.setState({tmpSample: tmpSample})
    }

    updateBoringSample = (sample) => {
        const {selectedBoringSampleKey, firebase, samplesPath} = this.props
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

  render() {
    const { samplesPath, onSelectBoringSample, classes, selectedBoringSampleKey, 
         firebase, onSetSampleDescDialogOpen } = this.props;    

    const onCloseDialog = () => {
        this.setState({tmpSample: {}})
        onSelectBoringSample(null)
        onSetSampleDescDialogOpen(false)
    }

    const onSaveSampleDesc = () => {
        this.updateBoringSample(this.state.tmpSample)
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
                    handleChange={this.updateTmpSampleFromEvent}
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
