import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import FullScreenDialog from '../Dialog'
import StrataInputList from './StrataInputList'

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
            top: null,
            bottom: null,
            spt: null,
            pocketPen: null,
            rimak: null,
        }
    }

  componentDidMount() {
    const { strata } = this.props;

    // we want a clone, not a copy of the reference
    let tmpStrata = strata ? JSON.parse(JSON.stringify(strata)) : {title:''}    
  
    this.setState({tmpStrata: tmpStrata})
  }

  render() {
    const { stratasPath, onSelectBoringStrata, classes, selectedBoringStrataKey, 
         firebase, onSetStrataDialogOpen } = this.props;    

    const updateBoringStrata = (strata) => {
        console.log('updating boring strata', strata)
        console.log('selectedBoringStrataKey', selectedBoringStrataKey)

        if(selectedBoringStrataKey) {
            firebase.update(
                stratasPath + selectedBoringStrataKey, 
                strata
            )
        } else {
            // this is a new one
            firebase.push(
                stratasPath, 
                strata ? strata : {title: 'Click Here to Change Title'}
            )
        }
    }

    let updateTmpStrata = (event, name) => {
        console.log("updating tmp strata")
        let tmpStrata = this.state.tmpStrata;
        tmpStrata[name] = event.target.value;
        this.setState({tmpStrata: tmpStrata})
    }

    const onCloseDialog = () => {
        this.setState({tmpStrata: {}})
        onSelectBoringStrata(null)
        onSetStrataDialogOpen(false)
    }

    const onSaveStrata = () => {
        updateBoringStrata(this.state.tmpStrata)
        onCloseDialog()
    }
    console.log("this.props.strataDialogOpen", this.props.strataDialogOpen)

    return (
      <div>
        <FullScreenDialog 
            title="Strata Description"
            fullScreen={true}
            open={this.props.strataDialogOpen}
            onClose={(e)=> onCloseDialog()}
            onSave={(e)=> onSaveStrata()}
            pageContent={
                <StrataInputList 
                    classes={classes}
                    handleChange={updateTmpStrata}
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
