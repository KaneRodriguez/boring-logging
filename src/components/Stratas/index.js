import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InteractiveListWithAddButton } from '../InteractiveList'
import StrataInfo from './StrataInfo'
import BoringPlot from '../BoringPlot'
import FullScreenDialog from '../Dialog'
import Button from 'material-ui/Button'
import PageWithScene from '../BoringPlot/PageWithScene'
import BasicPageWithScene from '../BoringPlot/BasicPageWithScene'
import annyang from 'annyang'


class Stratas extends Component {
    state = {
        tmpStrata: {
            title: null,
            top: null,
            bottom: null,
            spt: null,
            pocketPen: null,
            rimak: null
        },
        commands: {},
    }

    componentWillMount() {
        if(annyang) {
          var commands = {
          'create strata': this.addStrataFromVoice,
          }          
          console.log('adding commands', commands)
          annyang.addCommands(commands);
    
          this.setState({commands})
        }
      }
      
      addStrataFromVoice = () => {
        if(!this.props.selectedBoringKey) {
          this.props.onSetStrataDialogOpen(true)
        } else {
          this.props.onVoiceCommandError("Error: Must be in strata view to create strata")
        }
      }

      componentWillUnmount() {
        if(annyang) {
    
            console.log('unmounting and annyang')
            if(this.state.commands) {
                console.log('removing commands', Object.keys(this.state.commands))
                annyang.removeCommands(Object.keys(this.state.commands));
            }
    
            this.setState({commands: {}})
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
    const { setStrataPlotShowing, selectedBoringStrataKey, firebase, onSetStrataDialogOpen } = this.props;

    const updateBoringStrataWithKey = (key, strata) => {
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

    let getSecondary = (key) => {
        if(boring.stratas) {
            let strata = boring.stratas[key]

            if(strata) {
                let soil = strata.soilName ? strata.soilName : null
                let top = strata.top ? strata.top : null
                let bottom = strata.bottom ? strata.bottom : null

                let secondary = (soil ? "Soil: " + soil : '') +
                                (top ? " Top: " + top : '') + 
                                (bottom ? " Bottom: " + bottom : '')
                
                return secondary.trim()
            }
        }
        return null
    } 

    let onCloseDialog = () => setStrataPlotShowing(false)

    return (
        <div>
            <FullScreenDialog 
                title="Strata Plot"
                fullScreen={true}
                open={this.props.showingStrataPlot}
                onClose={(e)=> onCloseDialog()}
                pageContent={
                    <BoringPlot stratas={boring.stratas}/>
                    //<BasicPageWithScene />
                }
            />
            <Button variant="raised" color="primary" onClick={(e)=> {setStrataPlotShowing(true)}}>
                Show Strata Plot
            </Button>

            <InteractiveListWithAddButton 
            name={'Strata'}
            getSecondary={getSecondary}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    selectedBoringStrataKey: state.projectState.selectedBoringStrataKey,
    strataDialogOpen: state.navState.strataDialogOpen,
    showingStrataPlot: state.projectState.showingStrataPlot,
});

const mapDispatchToProps = (dispatch) => ({
    onSelectBoringStrata: (key) => dispatch({ type: 'BORING_STRATA_SELECT', key }),
    onSetStrataDialogOpen: (open) => dispatch({ type: 'SET_STRATA_DIALOG_OPEN', open }),
    setStrataPlotShowing: (showing) => dispatch({ type: 'STRATA_PLOT_SHOW', showing })
});

export default connect(mapStateToProps, mapDispatchToProps)(Stratas)
