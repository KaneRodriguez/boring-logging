import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Mic from 'material-ui-icons/Mic';
import MicOff from 'material-ui-icons/MicOff';
import annyang from 'annyang'

const styles = {
};

class ToggleVoiceIcon extends React.Component {

  state = {
    micOn: false
  }

  handleClick = () => {
    if(annyang) {
      let trueMicOn = annyang.isListening()
  
      if(trueMicOn) {
        annyang.abort()
      } else {
        annyang.start({ autoRestart: true })
      }
  
      this.setState({micOn: !trueMicOn})
    }
  }

  render() {
    const { micOn } = this.state

    return (      
          <IconButton onClick={this.handleClick}
            color="inherit"
          >
            {micOn // todo, base off of some redux variable that is tied to annyang listening state
            ? <Mic />
            : <MicOff />
            }
          </IconButton>
    );
  }
}

const mapStateToProps = (state) => ({
});
  
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ToggleVoiceIcon));