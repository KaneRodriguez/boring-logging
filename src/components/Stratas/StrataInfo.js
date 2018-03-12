import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import FullScreenDialog from '../Dialog'
import StrataInputList from './StrataInputList'
import annyang from 'annyang'
import wordsToNumbers from 'words-to-numbers'

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

class StrataInfo extends Component {

    state = {
        tmpStrata: {
            title: '',
            top: 0,
            bottom: 0,
            soilName: '',
            soilDescription: ''
        },
        commands: {}
    }

  componentDidMount() {
    const { strata } = this.props;

    // we want a clone, not a copy of the reference
    let tmpStrata = strata ? JSON.parse(JSON.stringify(strata)) : {title:''}    
  
    this.setState({tmpStrata: tmpStrata})

    if(annyang) {
        var commands = {
            'close (window)': this.onCloseDialog,
            'save (window)': this.onSave,
            '*target is *value': this.updateTmpStrataFromVoice,
            'change *target to *value': this.updateTmpStrataFromVoice,
            'change title to *value': (value)=> this.updateTmpStrataFromVoice('TITLE', wordsToNumbers(value, {fuzzy: true})),
            'change top to *value': (value)=> this.updateTmpStrataFromVoice('TOP', wordsToNumbers(value, {fuzzy: true})),
            'change bottom to *value': (value)=> this.updateTmpStrataFromVoice('BOTTOM', wordsToNumbers(value, {fuzzy: true})),
            'change soil name to *value': (value)=> this.updateTmpStrataFromVoice('SOIL NAME', wordsToNumbers(value, {fuzzy: true})),
            'change soil description to *value': (value)=> this.updateTmpStrataFromVoice('SOIL DESCRIPTION', wordsToNumbers(value, {fuzzy: true})),
        }     

        console.log('mounting and annyang')
        annyang.addCommands(commands);

        this.setState({commands})
    }
  }

    componentWillUnmount() {
        if(annyang) {

            console.log('unmounting annyang')
            if(this.state.commands) {
                console.log('removing commands', Object.keys(this.state.commands))
                annyang.removeCommands(Object.keys(this.state.commands));
            }

            this.setState({commands: {}})
        }
    }

    updateTmpStrataFromVoice = (target, value) => {
        switch(target.trim().toUpperCase()) {
            case 'TITLE': {
                this.updateTmpStrata('title', value)
                break;
            }
            case 'TOP': {
                this.updateTmpStrata('top', value)
                break;
            }
            case 'BOTTOM': {
                this.updateTmpStrata('bottom', value)
                break;
            }
            case 'SOIL NAME': case 'NAME': case 'OLD MAN': {
                this.updateTmpStrata('soilName', value)
                break;
            }
            case 'SOIL DESCRIPTION': case 'DESCRIPTION': {
                this.updateTmpStrata('soilDescription', value)
                break;
            }
        }
    }

    updateTmpStrataFromEvent = (event, name) => {
        this.updateTmpStrata(name, event.target.value)
    }
    
    updateTmpStrata = (key, value) => {
        let tmpStrata = this.state.tmpStrata;
        tmpStrata[key] = value;
        this.setState({tmpStrata: tmpStrata})
    }

    onCloseDialog = () => {
        this.setState({tmpStrata: {}})
        this.props.onSelectBoringStrata(null)
        this.props.onSetStrataDialogOpen(false)
    }

    onSaveStrata = () => {
        this.updateBoringStrata(this.state.tmpStrata)
        this.onCloseDialog()
    }

    updateBoringStrata = (strata) => {
        if(this.props.selectedBoringStrataKey) {
            this.props.firebase.update(
                this.props.stratasPath + this.props.selectedBoringStrataKey, 
                strata
            )
        } else {
            // this is a new one
            this.props.firebase.push(
                this.props.stratasPath, 
                strata ? strata : {title: 'New Strata'}
            )
        }
    }


  render() {
    const { stratasPath, onSelectBoringStrata, classes, selectedBoringStrataKey, 
         firebase, onSetStrataDialogOpen } = this.props;    
    
    return (
      <div>
        <FullScreenDialog 
            title="Strata Description"
            fullScreen={true}
            open={this.props.strataDialogOpen}
            onClose={this.onCloseDialog}
            onSave={this.onSaveStrata}
            pageContent={
                <StrataInputList 
                    classes={classes}
                    handleChange={this.updateTmpStrataFromEvent}
                    strata={this.state.tmpStrata}
                />
            }
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    strataDialogOpen: state.navState.strataDialogOpen,
    selectedBoringStrataKey: state.projectState.selectedBoringStrataKey,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringStrata: (key) => dispatch({ type: 'BORING_STRATA_SELECT', key }),
    onSetStrataDialogOpen: (open) => dispatch({ type: 'SET_STRATA_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles) (StrataInfo));
