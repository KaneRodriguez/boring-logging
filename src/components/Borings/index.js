import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import BoringInfo from './BoringInfo'
import { InteractiveListWithAddButton } from '../InteractiveList'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles';
import Samples from '../Samples'
import Stratas from '../Stratas'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider';

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
       root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
      },
  });

class Borings extends Component {

  render() {
    const { project, boringsPath, onSelectProjectBoring, firebase, 
        selectedBoringKey, classes} = this.props;

    const addBoring = () => firebase.push(boringsPath, {title: 'Click Here to Change Title'})
    const removeBoring = (key) => firebase.remove(boringsPath + key)
    const editBoringTitle = (key, title) => firebase.update(boringsPath + key, {title: title})

    const bonusButtonOneClicked = (key) => {
        onSelectProjectBoring(key)
        this.props.onBoringInfoShow(true)
    }

    const bonusButtonTwoClicked = (key) => {
        onSelectProjectBoring(key)
        this.props.onBoringSampleDescShow(true)
    }

    let boring = project.borings ? project.borings[selectedBoringKey] : null

    return (
      <div>

        { !this.props.showingBoringSamples
        ? <InteractiveListWithAddButton
            name='Boring'
            extraHeader={project.title}
            items={project.borings}
            removeItem={removeBoring}
            selectItem={onSelectProjectBoring}
            editItemTitle={editBoringTitle}
            addItem={addBoring}
            classes={classes}
            bonusButtonOneTitle={"Info"}
            bonusButtonOneOnClick={(key)=> bonusButtonOneClicked(key)}
            bonusButtonTwoTitle={"Samples"}
            bonusButtonTwoOnClick={(key)=> bonusButtonTwoClicked(key)}
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
            <Divider />
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