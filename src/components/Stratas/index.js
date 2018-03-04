import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InteractiveListWithAddButton } from '../InteractiveList'
import StrataInfo from './StrataInfo'

class Stratas extends Component {
    state = {
        tmpStrata: {
            title: null,
            top: null,
            bottom: null,
            spt: null,
            pocketPen: null,
            rimak: null
        }
    }

  componentDidMount() {
    const { boring, selectedBoringStrataKey } = this.props;

    let strata = selectedBoringStrataKey ? boring.stratas[selectedBoringStrataKey] : null
    
    // we want a clone, not a copy of the reference
    let tmpStrata = strata ? JSON.parse(JSON.stringify(strata)) : {title:''}    
  
    this.setState({tmpStrata: tmpStrata})
    }
    
  render() {
    const { boring, stratasPath, onSelectBoringStrata, classes } = this.props
    const { selectedBoringStrataKey, firebase, onSetStrataDialogOpen } = this.props;

    const updateBoringStrataWithKey = (key, strata) => {
        console.log("updating boring strata with key", key, strata)
        firebase.update(
            stratasPath + key, 
            strata
        )
    }

    const removeBoringStrata = (key) => firebase.remove(
        stratasPath + key)

    const boringStrataSelected = (key) => {
        onSelectBoringStrata(key)
        onSetStrataDialogOpen(true)
    }

    let strata = boring.stratas ? boring.stratas[selectedBoringStrataKey] : null

    return (
        <div>
            <InteractiveListWithAddButton 
            name={'Strata'}
            items={boring.stratas}
            removeItem={removeBoringStrata}
            selectItem={(key)=> boringStrataSelected(key)}
            addItem={(e) => onSetStrataDialogOpen(true)}
            classes={classes}
            editItemTitle={(key, title)=> updateBoringStrataWithKey(key, {title: title})}
            />

            { this.props.strataDialogOpen
                ? <StrataInfo
                    stratasPath={stratasPath}
                    strata={strata}
                    classes={classes}
                    firebase={firebase}
                />
                : null 
            }
            {/* <FullScreenDialog 
                title="Strata"
                open={this.props.strataDialogOpen}
                onClose={(e)=> onSetStrataDialogOpen(false)}
                onSave={(e)=> onSaveStrata()}
                pageContent={
                    <StrataInputList 
                        classes={classes}
                        handleChange={updateNewStrata}
                        strata={selectedBoringStrataKey ? selectedStrata : this.state.newStrataStrata}
                    />
                }
            /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedBoringStrataKey: state.projectState.selectedBoringStrataKey,
    strataDialogOpen: state.navState.strataDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringStrata: (key) => dispatch({ type: 'BORING_STRATA_SELECT', key }),
    onSetStrataDialogOpen: (open) => dispatch({ type: 'SET_STRATA_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stratas)
