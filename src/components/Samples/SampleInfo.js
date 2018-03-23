import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles';
import FullScreenDialog from '../Dialog'
import SampleInputList from './SampleInputList'
import annyang from 'annyang'
import withVoiceRecognitionAI, {enhancedWordsToNumbers} from '../VoiceRecognitionAI'

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
            'close': this.onCloseDialog,
            'save': this.onSaveSampleDesc,
            '*target is *value': this.updateTmpSampleFromVoice
            // 'title is *value': (value)=> this.updateTmpSampleFromVoice('TITLE', wordsToNumbers(value, {fuzzy: true})),
            // 'top is *value': (value)=> this.updateTmpSampleFromVoice('TOP', wordsToNumbers(value, {fuzzy: true})),
            // 'bottom is *value': (value)=> this.updateTmpSampleFromVoice('BOTTOM', wordsToNumbers(value, {fuzzy: true})),
            // 'PP 1 is *value': (value)=> this.updateTmpSampleFromVoice('PP 1', wordsToNumbers(value, {fuzzy: true})),
            // 'PP 1 is *value': (value)=> this.updateTmpSampleFromVoice('PP 1', wordsToNumbers(value, {fuzzy: true})),
            // 'PP 2 is *value': (value)=> this.updateTmpSampleFromVoice('PP 2', wordsToNumbers(value, {fuzzy: true})),
            // 'PP 3 is *value': (value)=> this.updateTmpSampleFromVoice('PP 3', wordsToNumbers(value, {fuzzy: true})),
            // 'SPT-1 is *value': (value)=> this.updateTmpSampleFromVoice('SPT-1', wordsToNumbers(value, {fuzzy: true})),
            // 'SPT-2 is *value': (value)=> this.updateTmpSampleFromVoice('SPT-2', wordsToNumbers(value, {fuzzy: true})),
            // 'SPT-3 is *value': (value)=> this.updateTmpSampleFromVoice('SPT-3', wordsToNumbers(value, {fuzzy: true})),
            // 'Rimak is *value': (value)=> this.updateTmpSampleFromVoice('rimak', wordsToNumbers(value, {fuzzy: true})),
            // 'recovery is *value': (value)=> this.updateTmpSampleFromVoice('recovery', wordsToNumbers(value, {fuzzy: true})),
            }          

            this.props.addVoiceCommands(commands);

            this.setState({commands})
        }
    }

    componentWillUnmount() {
        if(annyang) {

            if(this.state.commands) {
                this.props.removeVoiceCommands(this.state.commands);            
            }

            this.setState({commands: {}})
        }
    }

    updateTmpSampleFromVoice = (target, value) => {
        switch(target.trim().toUpperCase()) {
            case 'TITLE': {
                console.log('updating tmp smaple from voice found title', target, value)
                this.updateTmpSample('title', value)
                break;
            }
            case 'TOP': case 'TIME': {
                this.updateTmpSample('top', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'SPT-1': case 'SPT 1': {
                this.updateTmpSample('sptOne', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'SPT-2': case 'SPT 2': {
                this.updateTmpSample('sptTwo', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'SPT-3': case 'SPT 3': {
                this.updateTmpSample('sptThree', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'BOTTOM': {
                this.updateTmpSample('bottom', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'PP 1': case 'PP ONE':  case 'PT 1':{
                this.updateTmpSample('pocketPenOne', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'PP 2': case 'PP TWO': case 'PT 2':{
                this.updateTmpSample('pocketPenTwo', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'PP 3': case 'PP THREE': case 'PT 3':{
                this.updateTmpSample('pocketPenThree', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'SPT': {
                value = enhancedWordsToNumbers(value)

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
            case 'POCKET PEN': case 'PAKISTAN': case 'POCKET PATTERN': case 'POCKET': case 'PEN': case 'PAIN': {
                value = enhancedWordsToNumbers(value)

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
            case 'RIMAK': case 'REMAC': case 'REMOC': case 'MY MAC': case 'MAC': case 'REACT':  case 'REMAX':
            case 'RIMAC': case 'REMARK': {
                this.updateTmpSample('rimak', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            case 'RECOVERY': case 'RECOVER': case 'RECOVERING': {
                this.updateTmpSample('recovery', enhancedWordsToNumbers(value, {fuzzy: false}))
                break;
            }
            default: {
                this.props.onVoiceCommandError('Error: ' + target + ' is not a valid option')
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
                sample ? sample : {title: 'New Sample'}
            )
        }
    }

    onCloseDialog = () => {
        this.setState({tmpSample: {}})
        this.props.onSelectBoringSample(null)
        this.props.onSetSampleDescDialogOpen(false)
    }

    onSaveSampleDesc = () => {
        this.updateBoringSample(this.state.tmpSample)
        this.onCloseDialog()
    }


  render() {
    const { samplesPath, onSelectBoringSample, classes, selectedBoringSampleKey, 
         firebase, onSetSampleDescDialogOpen } = this.props;    

    return (
      <div>
        <FullScreenDialog 
            title="Sample Description"
            fullScreen={true}
            open={this.props.sampleDescDialogOpen}
            onClose={this.onCloseDialog}
            onSave={this.onSaveSampleDesc}
            voiceHint={true}
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
    onVoiceCommandError: (error) => dispatch({ type: 'VOICE_COMMAND_ERROR', error }),
});

export default compose(
    withVoiceRecognitionAI,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
 )(SampleInfo)
