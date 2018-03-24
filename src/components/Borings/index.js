import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import BoringInfo from './BoringInfo'

import Samples from '../Samples'
import Stratas from '../Stratas'

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider';

import { InteractiveListWithAddButton } from '../InteractiveList'
import { withStyles } from 'material-ui/styles';
import annyang from 'annyang'
import SimpleTable from '../SimpleTable'
import withVoiceRecognitionAI from '../VoiceRecognitionAI';
import SimpleMap from '../SimpleMap';

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
    pocketPen: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
       root: {
        flexGrow: 1,
      },
      paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        color: theme.palette.text.secondary,

      })
  });

class Borings extends Component {
    state = {
        commands: {},
    }

    componentDidMount() {
        if(annyang) {
          var commands = {
          'create boring': this.addBoringFromVoice,
          }          
          this.props.addVoiceCommands(commands)

          this.setState({commands})
        }
      }
      
      addBoringFromVoice = () => {
        if(!this.props.selectedBoringKey) {
          this.addBoring({title: 'New Boring'})
        } else {
          this.props.onVoiceCommandError("Error: Must be in boring view to create boring")
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
      
      addBoring = (obj) => {
        const {firebase, authUser, boringsPath} = this.props
        let newObj = obj ? obj : {title: 'New Boring'}
        firebase.push(boringsPath, newObj)
      }

    boringSelected = (key) => {
        this.props.onSelectProjectBoring(key)
        this.props.onBoringSampleDescShow(true)
    }

    boringInfoShowClicked = (key) => {
        this.props.onSelectProjectBoring(key)
        this.props.onBoringInfoShow(true)
    }



  render() {
    const { project, boringsPath, onSelectProjectBoring, firebase, 
        selectedBoringKey, classes} = this.props;

    const removeBoring = (key) => firebase.remove(boringsPath + key)
    const editBoringTitle = (key, title) => firebase.update(boringsPath + key, {title: title})

    let boring = project.borings ? project.borings[selectedBoringKey] : null

    // we want the lat lon pairs
    let boringLocations = []

    if(project.borings) {
        Object.keys(project.borings).map((key)=> {
            
            let boringInfo = project.borings[key]

            if (boringInfo.latitude && boringInfo.longitude && boringInfo.title) {   
                boringLocations.push({
                    title:     boringInfo.title,
                    latitude:  boringInfo.latitude, 
                    longitude: boringInfo.longitude,
                })
            }
        })
    }

    return (
      <div>
        { !this.props.showingBoringSamples
        ? <div>
            <InteractiveListWithAddButton
            name='Boring'
            extraHeader={project.title}
            items={project.borings}
            removeItem={removeBoring}
            selectItem={this.boringSelected}
            editItemTitle={editBoringTitle}
            addItem={()=> this.addBoring()}
            classes={classes}
            bonusButtonOneTitle={"Info"}
            bonusButtonOneOnClick={this.boringInfoShowClicked}
            />
            {/* <SimpleMap
            locations={boringLocations}
            /> */}
        </div>
        : 
        <div className={classes.root} spacing={4}>
        
        { !!selectedBoringKey 
        ? null //<SimpleTable 
            //data={project.borings[selectedBoringKey]}/>
        : null}

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Samples 
                        samplesPath={boringsPath + `${selectedBoringKey}/samples/`}
                        boring={boring}
                        classes={classes}
                        firebase={firebase}
                    /> 
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Stratas 
                        stratasPath={boringsPath + `${selectedBoringKey}/stratas/`}
                        boring={boring}
                        classes={classes}
                        firebase={firebase}
                    />  
                </Paper>
            </Grid>

        </div>
        }
            { !!selectedBoringKey 
            ? this.props.showingBoringInfo
                ? <BoringInfo 
                boring={project.borings[selectedBoringKey]}
                boringsPath={boringsPath}
                classes={classes}
                firebase={firebase}
                />
                : null 
            : null
            }

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
    onBoringSampleDescShow: (showing) => dispatch({ type: 'BORING_SAMPLE_DESC_SHOW', showing }),
    onSelectProjectBoring: (key) => dispatch({ type: 'USER_PROJECT_BORING_SELECT', key }),
    onVoiceCommandError: (error) => dispatch({ type: 'VOICE_COMMAND_ERROR', error }),
});

export default compose(
    withVoiceRecognitionAI,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Borings);