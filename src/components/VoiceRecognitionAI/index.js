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

    componentDidMount() {
      const {authUser} = this.props;

      if(authUser) {
        if (annyang) {
          // var commands = {
          //   'open *target (page)': this.openCommand,
          //   'rename *target (to) (too) :name': (target, name)=> {
          //     this.commandHandler('rename', target, name)
          //    },
          //   'create *target': this.newCommand,
          //   'delete *target': this.removeCommand,
          // }

          // --------
          // EXAMPLES
          // --------
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

          // Add our commands to annyang
          // annyang.addCommands(commands);
        
          // Start listening.
          annyang.start({ autoRestart: true });
        }
      }
    }

    // openCommand = (target) => {
    //   switch(target.trim().toUpperCase()) {
    //     case 'HOME': {
    //       //TODO: Component.props.history.push('/home')
    //       break;
    //     }
    //     // case 'BORING INFO' || 'OPEN_BORING_INFO': {
    //     //   if(this.props.selectedProjectKey && this.props.selectedBoringKey) {
    //     //    TODO: this.props.onBoringInfoShow(true)
    //     //   } else {
    //     //     // dispatch error
    //     //   }
    //     //   break;
    //     // }  
    //   }
    // }

    // newCommand = (target) => {
    //   console.log('taret', target)
    //   switch(target.trim().toUpperCase()) {
    //     case 'PROJECT': {
    //       this.addProject({title: 'New Project'})   
    //       break;        
    //     }  
    //     case 'BORING': {
    //       if(this.props.selectedProjectKey) {
    //         this.addBoring({title: 'New Boring'})           
    //       } else {
    //          // dispatch error
    //        }
    //        break;
    //     }
    //   }
    // }

    // // TODO: All of this belongs in a firebase handler class

    // getMatchingKeys = (map, searchTitle) => {
    //   let keys = []
    //   Object.keys(map).map((key, index) => {
    //     let item = map[key]
    //     if(item && item.title) {
    //       if(item.title.trim().toUpperCase() == searchTitle.trim().toUpperCase()) {
    //         keys.push(key)            
    //       }
    //     }
    //   })
    //   return keys
    // }



    // renameCommand = (target, name) => {
    //   let targetFound = false;
      
    //   if(this.props.firebase && this.props.profile) {
    //     let projectsMap = this.props.profile.projects
    //     let projectsPath = `users/${this.props.authUser.uid}/projects/`
    //     let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`

    //     if(this.props.selectedBoringKey) {
    //     // TODO: add samples and stratas before this
    //     } else if(this.props.selectedProjectKey) {
    //       let boringsMap = projectsMap[this.props.selectedProjectKey].borings

    //       if(!boringsMap) {
    //         this.props.onVoiceCommandError(`Sorry, there are no borings to delete.`)
    //         return;
    //       }

    //       this.getMatchingKeys(boringsMap, target).forEach(key => {
    //         targetFound = true
    //         this.props.firebase.update(boringsPath + key, {title: name})  
    //       });
          
    //     } else {
    //       if(!projectsMap) {
    //         this.props.onVoiceCommandError(`Sorry, there are no projects to delete.`)
    //         return;
    //       }

    //       this.getMatchingKeys(projectsMap, target).forEach(key => {
    //         targetFound = true
    //         this.props.firebase.update(projectsPath + key, {title: name})    
    //       });
    //     }
    //   }

    //   if(!targetFound) {
    //     this.props.onVoiceCommandError(`Sorry, ${target.trim().toUpperCase()} was not found.`)
    //   }
    // }

    //                 //'rename', 's-1', 'difNameS1', fun
    // commandHandler = (type, target, name, error) => {
    //   // find matches
    //   // handler knows based on what variables available, what 
    //   // can be updated
    //   let matchingKeys = []

    //   let projectsPath = `users/${this.props.authUser.uid}/projects/`
    //   let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`
    //   let samplesPath = boringsPath + `${this.props.selectedBoringKey}/samples/`
    //   let stratasPath = boringsPath + `${this.props.selectedBoringKey}/stratas/`

    //   if(this.props.selectedBoringKey) {
    //     matchingKeys.concat(this.getMatchingKeysByType('SAMPLE', target))

    //     if(matchingKeys.length == 0) {
    //       matchingKeys.concat(this.getMatchingKeysByType('STRATA', target))

    //       if(matchingKeys.length != 0) {
    //         matchingKeys.forEach((key)=> this.props.firebase.update(stratasPath + key, {title: name}))
    //       }

    //     } else {
    //       matchingKeys.forEach((key)=> this.props.firebase.update(samplesPath + key, {title: name}))
    //     }

    //     return matchingKeys;

    //   } else if(this.props.selectedProjectKey) {
    //     matchingKeys.concat(this.getMatchingKeysByType('PROJECT'))

    //     if(matchingKeys.length > 0) {
    //       matchingKeys.forEach((key)=> this.props.firebase.update(projectsPath + key, {title: name}))
    //     }

    //     return matchingKeys;
    //   }
    // }

    // getMatchingKeysByType = (type, target) => {
    //   let matchingKeys = []

    //   if(this.props.firebase && this.props.profile) {
    //     let projectsMap = this.props.profile.projects
    //     let projectsPath = `users/${this.props.authUser.uid}/projects/`
    //     let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`
    //     let samplesPath = boringsPath + `${this.props.selectedBoringKey}/samples/`
    //     let stratasPath = boringsPath + `${this.props.selectedBoringKey}/stratas/`

    //     if(this.props.selectedBoringKey && this.props.selectedProjectKey) {
    //       let boring = projectsMap[this.props.selectedProjectKey]
    //                         .borings[this.selectedBoringKey]

    //       let samplesMap = boring.samples
    //       let stratasMap = boring.stratas

    //       if(samplesMap && target.trim.toUpperCase() == 'SAMPLE') {
    //         matchingKeys.concat(this.getMatchingKeys(samplesMap, target))
    //       }

    //       if(stratasMap && target.trim.toUpperCase() == 'STRATA') {
    //         matchingKeys.concat(this.getMatchingKeys(stratasMap, target))
    //       }

    //     } else if(this.props.selectedProjectKey) {
    //       let boringsMap = projectsMap[this.props.selectedProjectKey].borings

    //       if(boringsMap && target.trim.toUpperCase() == 'BORING') {
    //         matchingKeys.concat(this.getMatchingKeys(boringsMap, target))
    //       }

    //     } else if(projectsMap && target.trim.toUpperCase() == 'PROJECT') {
    //         matchingKeys.concat(this.getMatchingKeys(projectsMap, target))
    //     }
    //   }
    //   return matchingKeys
    // }
    
    // removeCommand = (target, name) => {
    //   let targetFound = false;

    //   if(this.props.firebase && this.props.profile) {
    //     let projectsMap = this.props.profile.projects
    //     let projectsPath = `users/${this.props.authUser.uid}/projects/`
    //     let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`
    //     let samplesPath = boringsPath + `${this.props.selectedBoringKey}/samples/`
    //     let stratasPath = boringsPath + `${this.props.selectedBoringKey}/stratas/`

    //     if(this.props.selectedBoringKey && this.props.selectedProjectKey) {
    //     // TODO: add samples and stratas before this
    //     let boring = projectsMap[this.props.selectedProjectKey]
    //                       .borings[this.selectedBoringKey]

    //     let samplesMap = boring.samples
    //     let stratasMap = boring.stratas

    //     if(!samplesMap) {
    //       this.props.onVoiceCommandError(`Sorry, there are no samples to delete.`)
    //       return;
    //     }

    //     this.getMatchingKeys(samplesMap, target).forEach(key => {
    //       targetFound = true
    //       this.props.firebase.remove(samplesPath + key)    
    //     });

    //     if(!stratasMap) {
    //       this.props.onVoiceCommandError(`Sorry, there are no stratas to delete.`)
    //       return;
    //     }

    //     this.getMatchingKeys(stratasMap, target).forEach(key => {
    //       targetFound = true
    //       this.props.firebase.remove(stratasPath + key)    
    //     });

    //     } else if(this.props.selectedProjectKey) {
    //       let boringsMap = projectsMap[this.props.selectedProjectKey].borings

    //       if(!boringsMap) {
    //         this.props.onVoiceCommandError(`Sorry, there are no borings to delete.`)
    //         return;
    //       }

    //       this.getMatchingKeys(boringsMap, target).forEach(key => {
    //         targetFound = true
    //         this.props.firebase.remove(boringsPath + key)    
    //       });

    //     } else {
    //       if(!projectsMap) {
    //         this.props.onVoiceCommandError(`Sorry, there are no projects to delete.`)
    //         return;
    //       }

    //       this.getMatchingKeys(projectsMap, target).forEach(key => {
    //         targetFound = true
    //         this.props.firebase.remove(projectsPath + key)       
    //       });

    //     }
    //   }
    

    //   if(!targetFound) {
    //     this.props.onVoiceCommandError(`Sorry, ${target.trim().toUpperCase()} was not found.`)
    //   }
      
    // }

    // addBoring = (obj) => {
    //   const {firebase, authUser} = this.props
    //   let projectsPath = `users/${authUser.uid}/projects/`
    //   let boringsPath = projectsPath + `${this.props.selectedProjectKey}/borings/`
    //   let newObj = obj ? obj : {title: 'New Boring'}
    //   firebase.push(boringsPath, newObj)
    // }

    // addProject = (obj) => {
    //   const {firebase, authUser} = this.props
    //   let projectsPath = `users/${authUser.uid}/projects/`
    //   let newObj = obj ? obj : {title: 'New Project'}
    //   firebase.push(projectsPath, newObj)
    // }

    render() {
      const { startListening, abortListening, authUser, finalTranscript, resetTranscript, firebase, transcript, browserSupportsSpeechRecognition } = this.props
      const { running } = this.state;

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