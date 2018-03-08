import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {withFirebase} from 'react-redux-firebase'
import annyang from 'annyang'

const withVoiceRecognitionAI = (Component) => {



  class VoiceRecognitionAI extends React.Component {
    state = {
      running: true
    }

    openCommand = (target) => {
      switch(target.trim().toUpperCase()) {
        case 'HOME': {
          //TODO: Component.props.history.push('/home')
          break;
        }
        // case 'BORING INFO' || 'OPEN_BORING_INFO': {
        //   if(this.props.selectedProjectKey && this.props.selectedBoringKey) {
        //    TODO: this.props.onBoringInfoShow(true)
        //   } else {
        //     // dispatch error
        //   }
        //   break;
        // }  
      }
    }

    newCommand = (target) => {
      console.log('taret', target)
      switch(target.trim().toUpperCase()) {
        case 'PROJECT': {
          this.addProject({title: 'New Project'})   
          break;        
        }  
        case 'BORING': {
          if(this.props.selectedProjectKey) {
            this.addBoring({title: 'New Boring'})           
          } else {
             // dispatch error
           }
           break;
        }
      }
    }

    renameCommand = (target, name) => {
      let targetFound = false;
      
      if(this.props.firebase && this.props.profile) {
        let projectsMap = this.props.profile.projects
        let projectsPath = `users/${this.props.authUser.uid}/projects/`
        let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`

        if(this.props.selectedBoringKey) {
        // TODO: add samples and stratas before this
        } else if(this.props.selectedProjectKey) {
          let boringsMap = projectsMap[this.props.selectedProjectKey]

          if(!boringsMap) {
            this.props.onVoiceCommandError(`Sorry, there are no borings to delete.`)
            return;
          }

          Object.keys(boringsMap).map((key, index) => {
            let item = boringsMap[key]
            if(item) {
              if(item.title.trim().toUpperCase() == target.trim().toUpperCase()) {
                targetFound = true
                this.props.firebase.update(boringsPath + key, {title: name})              
              }
            }
          })
        } else {
          if(!projectsMap) {
            this.props.onVoiceCommandError(`Sorry, there are no projects to delete.`)
            return;
          }
          Object.keys(projectsMap).map((key, index) => {
            let item = projectsMap[key]
            if(item) {
              if(item.title.trim().toUpperCase() == target.trim().toUpperCase()) {
                targetFound = true
                this.props.firebase.update(projectsPath + key, {title: name})              
              }
            }
          })
        }
      }

      if(!targetFound) {
        this.props.onVoiceCommandError(`Sorry, ${target.trim().toUpperCase()} was not found.`)
      }
    }
    
    removeCommand = (target, name) => {
      let targetFound = false;
      try {
      if(this.props.firebase && this.props.profile) {
        let projectsMap = this.props.profile.projects
        let projectsPath = `users/${this.props.authUser.uid}/projects/`
        let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`

        if(this.props.selectedBoringKey) {
        // TODO: add samples and stratas before this
        } else if(this.props.selectedProjectKey) {
          let boringsMap = projectsMap[this.props.selectedProjectKey]

          if(!boringsMap) {
            this.props.onVoiceCommandError(`Sorry, there are no borings to delete.`)
            return;
          }

          Object.keys(boringsMap).map((key, index) => {
            let item = boringsMap[key]
            if(item) {
              if(item.title.trim().toUpperCase() == target.trim().toUpperCase()) {
                targetFound = true
                this.props.firebase.remove(boringsPath + key)              
              }
            }
          })
        } else {
          if(!projectsMap) {
            this.props.onVoiceCommandError(`Sorry, there are no projects to delete.`)
            return;
          }

          Object.keys(projectsMap).map((key, index) => {
            let item = projectsMap[key]
            if(item) {
              if(item.title.trim().toUpperCase() == target.trim().toUpperCase()) {
                targetFound = true
                this.props.firebase.remove(projectsPath + key)              
              }
            }
          })
        }
      }
    } catch({...error}) {
      this.props.onVoiceCommandError(error)
      console.log(error)
    }
      if(!targetFound) {
        this.props.onVoiceCommandError(`Sorry, ${target.trim().toUpperCase()} was not found.`)
      }
      
    }

    addBoring = (obj) => {
      const {firebase, authUser} = this.props
      let projectsPath = `users/${authUser.uid}/projects/`
      let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`
      let newObj = obj ? obj : {title: 'New Boring'}
      firebase.push(boringsPath, newObj)
    }

    addProject = (obj) => {
      const {firebase, authUser} = this.props
      let projectsPath = `users/${authUser.uid}/projects/`
      let newObj = obj ? obj : {title: 'New Project'}
      firebase.push(projectsPath, newObj)
    }

    render() {
      const { startListening, abortListening, authUser, finalTranscript, resetTranscript, firebase, transcript, browserSupportsSpeechRecognition } = this.props
      const { running } = this.state;

      

      if(authUser) {
        if (annyang) {
          var commands = {
            'open *target (page)': this.openCommand,
            'rename *target (to) (too) :name': this.renameCommand,
            'create *target': this.newCommand,
            'delete *target': this.removeCommand,
          }
          // Let's define a command.
          // var commands = {
          //   // annyang will capture anything after a splat (*) and pass it to the function.
          //   // e.g. saying "Show me Batman and Robin" will call showFlickr('Batman and Robin');
          //   'show me *tag': showFlickr,
          
          //   // A named variable is a one word variable, that can fit anywhere in your command.
          //   // e.g. saying "calculate October stats" will call calculateStats('October');
          //   'calculate :month stats': calculateStats,
          
          //   // By defining a part of the following command as optional, annyang will respond
          //   // to both: "say hello to my little friend" as well as "say hello friend"
          //   'say hello (to my little) friend': greeting
          // };

          // var showFlickr = function(tag) {
          //   var url = 'http://api.flickr.com/services/rest/?tags='+tag;
          //   $.getJSON(url);
          // }
          
          // var calculateStats = function(month) {
          //   $('#stats').text('Statistics for '+month);
          // }
          
          // var greeting = function() {
          //   $('#greeting').text('Hello!');
          // }
        
          annyang.addCallback('result', function(userSaid) {
            console.log(userSaid); // sample output: 'hello'
          });
          annyang.addCallback('resultMatch', function(userSaid) {
            console.log(userSaid); // sample output: 'hello'
          });

          // Add our commands to annyang
          annyang.addCommands(commands);
        
          // Start listening.
          annyang.start();
        }
      }

      return (
        <div>
          <Component 
          {...this.props}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    selectedProjectKey: state.projectState.selectedProjectKey,
    selectedBoringKey: state.projectState.selectedBoringKey,
  });

  const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onVoiceCommandError: (error) => dispatch({ type: 'VOICE_COMMAND_ERROR', error }),
  });
  
  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    connect(({ firebase: { profile } }) => ({ profile }))
  )(VoiceRecognitionAI);

}

export default withVoiceRecognitionAI