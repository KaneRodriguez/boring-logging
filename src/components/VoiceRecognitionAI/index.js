import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {withFirebase} from 'react-redux-firebase'
import annyang from 'annyang'
import wordsToNumbers from 'words-to-numbers'
import VoiceHint from './VoiceHint'

const withVoiceRecognitionAI = (Component) => {

  class VoiceRecognitionAI extends React.Component {

    componentDidMount() {
      const {authUser} = this.props;

      if(authUser) {
        if (annyang) {

          annyang.addCallback('result', function(userSaid) {
            console.log(userSaid); 
          });
          annyang.addCallback('resultMatch', function(userSaid) {
            console.log(userSaid); 
          });
          let this_ = this;
          annyang.addCallback('error', function(error) {
            console.log('error', error); 
            this_.props.onVoiceCommandError(error.error)
          });
        }
      }
    }

    addVoiceCommands = (commands) => {
      if(!commands) {
        commands = {}
      }
      if(annyang) {
        console.log('adding annyang commands:', commands)
        annyang.addCommands(commands)
        this.props.onAddCommands(Object.keys(commands))
      }
    }

    removeVoiceCommands = (commands) => {
      if(!commands) {
        commands = {}
      }
      if(annyang) {
        console.log('removing annyang commands:', commands)
        annyang.removeCommands(Object.keys(commands))
        this.props.onRemoveCommands(Object.keys(commands))
      }
    }

    render() {
      return (
        <div>
          <Component 
          {...this.props}
          addVoiceCommands={this.addVoiceCommands}
          removeVoiceCommands={this.removeVoiceCommands}
          />
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  const mapDispatchToProps = (dispatch) => ({
    onVoiceCommandError: (error) => dispatch({ type: 'VOICE_COMMAND_ERROR', error }),
    onAddCommands: (commands) => dispatch({ type: 'ADD_COMMANDS', commands }),
    onRemoveCommands: (commands) => dispatch({ type: 'REMOVE_COMMANDS', commands }),
  });
  
  return compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(VoiceRecognitionAI);

}

export default withVoiceRecognitionAI

const enhancedWordsToNumbers = (value, options) => {
  if(value.replace) {
    // replace any pesky 'to'
    value = value.replace(/to/g, '2')

    // replace any pesky 'too'
    value = value.replace(/too/g, '2')
    
    // replace any pesky 'for'
    value = value.replace(/for/g, '4')
  }
  // just in case there was any 'one' 'two' etc
  value = wordsToNumbers(value, options)

  // remove all spaces
  // remove forward slashes
  if(value.replace) {
    value = value.replace(/ +/g, "");
    value = value.replace(/\//g, "")

  }
  return value
}

export {
  enhancedWordsToNumbers,
  VoiceHint
}