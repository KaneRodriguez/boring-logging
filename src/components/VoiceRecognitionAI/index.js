import React from 'react'
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {withFirebase} from 'react-redux-firebase'


const withVoiceRecognitionAI = (Component) => {

  const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
  }




  class VoiceRecognitionAI extends React.Component {
    state = {
      running: true,
      voiceCommands: []
    }

    addVoiceCommand = (command, receiver, option, success, waitForValue=true) => {
      const {voiceCommands} = this.state

      console.log('adding command', command)
      voiceCommands.push({
        command: command,
        receiver: receiver,
        option: option,
        success: success,
        waitForValue: waitForValue 
      })
      this.setState({voiceCommands:voiceCommands})
    }

    findVoiceCommand = (transcript) => {
      const {resetTranscript, setRunningTrue} = this.props
      console.log("finding voice command")
        // we want a clone, not a copy of the reference
        let tmpTranscript = JSON.parse(JSON.stringify(transcript))   

        this.state.voiceCommands.forEach((voiceCommand, index) => {
          if(tmpTranscript.includes(voiceCommand.command)) {
            tmpTranscript = tmpTranscript.replace(voiceCommand.command, '')
            if(tmpTranscript.includes(voiceCommand.receiver)) {
              tmpTranscript = tmpTranscript.replace(voiceCommand.receiver, '')
              if(tmpTranscript.includes(voiceCommand.option) || voiceCommand.option == '' || voiceCommand.option == null) {
                console.log("all critera met with", transcript)

                if(voiceCommand.option && voiceCommand.option != '') {
                  tmpTranscript = tmpTranscript.replace(voiceCommand.option, '')
                }

                if(tmpTranscript != '' || !voiceCommand.waitForValue) {
                  console.log('value is not empty')
                  if(this.state.running) {
                    console.log("running")
                    this.setState({running: false})

                    resetTranscript()

                    voiceCommand.success(tmpTranscript, voiceCommand)

                    let _this = this
                    setTimeout(function() {
                      _this.setRunningTrue()
                    }, 650)
                  } else {
                    console.log("not running")
                  }
                }
              }
            }
          }
        })
    }

    setRunningTrue = () => {
      console.log('setting running true')
      this.setState({running: true})
    }

    render() {
      const { startListening, abortListening, authUser, finalTranscript, resetTranscript, firebase, transcript, browserSupportsSpeechRecognition } = this.props
      const { running } = this.state;

      if(authUser) {
        if (!browserSupportsSpeechRecognition) {
          return null
        }
        this.findVoiceCommand(finalTranscript)
      }

      return (
        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
          <Component 
          addVoiceCommand={this.addVoiceCommand}
          {...this.props}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  VoiceRecognitionAI.propTypes = propTypes

  return compose(
    connect(mapStateToProps, null),
    withFirebase,
    SpeechRecognition,
    connect(({ firebase: { profile } }) => ({ profile }))
  )(VoiceRecognitionAI);

}

export default withVoiceRecognitionAI