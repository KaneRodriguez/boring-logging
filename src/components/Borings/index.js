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
    constructor(props) {
        super(props)
    }
    updateBoringInfo = (value, voiceCommand) => {
        const {firease, project, profile, boringsPath} = this.props
            
        Object.keys(project.borings).map(key => {
            let boring = project.borings[key]
            console.log('looking at boring', boring)
      
            if(boring.title.trim().toUpperCase() == voiceCommand.receiver.trim().toUpperCase()) {
              this.boringInfoShowClicked(key)
              // break out of mapping?
            }
          })
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

    const addBoring = () => firebase.push(boringsPath, {title: 'Click Here to Change Title'})
    const removeBoring = (key) => firebase.remove(boringsPath + key)
    const editBoringTitle = (key, title) => firebase.update(boringsPath + key, {title: title})

    let boring = project.borings ? project.borings[selectedBoringKey] : null

    return (
      <div>
        { !this.props.showingBoringSamples
        ? <InteractiveListWithAddButton
            name='Boring'
            extraHeader={project.title}
            items={project.borings}
            removeItem={removeBoring}
            selectItem={this.boringSelected}
            editItemTitle={editBoringTitle}
            addItem={addBoring}
            classes={classes}
            bonusButtonOneTitle={"Info"}
            bonusButtonOneOnClick={this.boringInfoShowClicked}
            />
        : 
        <div className={classes.root} spacing={4}>
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
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Borings);