import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InteractiveListWithAddButton } from '../InteractiveList'
import SampleInfo from './SampleInfo'

class Samples extends Component {
    state = {
        tmpSample: {
            title: '',
            top: null,
            bottom: null,
            spt: null,
            pocketPen: null,
            rimak: null
        }
    }

  componentDidMount() {
    const { boring, selectedBoringSampleKey } = this.props;

    let sample = selectedBoringSampleKey ? boring.samples[selectedBoringSampleKey] : null
    
    // we want a clone, not a copy of the reference
    let tmpSample = sample ? JSON.parse(JSON.stringify(sample)) : {title:''}    
  
    this.setState({tmpSample: tmpSample})
    }
    
  render() {
    const { boring, samplesPath, onSelectBoringSample, classes } = this.props
    const { selectedBoringSampleKey, firebase, onSetSampleDescDialogOpen } = this.props;

    const updateBoringSampleWithKey = (key, sample) => {
        firebase.update(
            samplesPath + key, 
            sample
        )
    }

    const removeBoringSample = (key) => firebase.remove(
        samplesPath + key)

    const boringSampleSelected = (key) => {
        onSelectBoringSample(key)
        onSetSampleDescDialogOpen(true)
    }
    return (
        <div>
            <InteractiveListWithAddButton 
            name={'Sample'}
            items={boring.samples}
            removeItem={removeBoringSample}
            selectItem={(key)=> boringSampleSelected(key)}
            addItem={(e) => onSetSampleDescDialogOpen(true)}
            classes={classes}
            editItemTitle={(key, title)=> updateBoringSampleWithKey(key, {title: title})}
            />

            { this.props.sampleDescDialogOpen
                ? <SampleInfo
                    samplesPath={samplesPath}
                    sample={boring.samples[selectedBoringSampleKey]}
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
                        sample={selectedBoringSampleKey ? selectedStrata : this.state.newSampleStrata}
                    />
                }
            /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedBoringSampleKey: state.projectState.selectedBoringSampleKey,
    sampleDescDialogOpen: state.navState.sampleDescDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringSample: (key) => dispatch({ type: 'BORING_SAMPLE_SELECT', key }),
    onSetSampleDescDialogOpen: (open) => dispatch({ type: 'SET_SAMPLE_DESC_DIALOG_OPEN', open }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
