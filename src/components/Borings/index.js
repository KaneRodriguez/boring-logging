import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase'

import BoringInfo from './BoringInfo'
import { InteractiveListWithAddButton } from '../InteractiveList'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles';
import Samples from '../Samples'

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

class Borings extends Component {

  render() {
    const { authUser, onSelectProjectBoring, firebase, selectedProjectKey, 
        selectedBoringKey, classes, profile} = this.props;

    let projectsPath = `users/${authUser.uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`

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

    return (
      <div>

        { !this.props.showingBoringSamples
        ? <InteractiveListWithAddButton
            name='Boring'
            extraHeader={profile.projects[selectedProjectKey].title}
            items={profile.projects[selectedProjectKey].borings}
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
        : <Samples 
            classes={classes}
            firebase={firebase}
            profile={profile}/> 
        }
            { !!selectedBoringKey 
            ? this.props.showingBoringInfo
                ? <BoringInfo 
                classes={classes}
                firebase={firebase}
                profile={profile}/>
                : null 
            : null
            }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
  showingBoringInfo: state.projectState.showingBoringInfo,
  showingBoringSamples: state.projectState.showingBoringSamples,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
    onBoringInfoShow: (showing) => dispatch({ type: 'BORING_INFO_SHOW', showing }),
    onBoringSampleDescShow: (showing) => dispatch({ type: 'BORING_SAMPLE_DESC_SHOW', showing }),
    onSelectProjectBoring: (key) => dispatch({ type: 'USER_PROJECT_BORING_SELECT', key }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withStyles(styles),
  connect(({ firebase: { profile } }) => ({ profile }))
)(Borings);