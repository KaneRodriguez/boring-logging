import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import FullScreenDialog from '../Dialog'
import IconButton from 'material-ui/IconButton';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import annyang from 'annyang'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';

const styles = theme => ({
  hint: {
      bottom: "10px",
      right: "10px",
      position: 'fixed',
  }
});

class VoiceHint extends React.Component {

  state = {
    showingVoiceHint: false
  }

  handleClick = () => {
    this.setState({showingVoiceHint: !this.state.showingVoiceHint})
  }

  render() {
    const { classes, fixed } = this.props

    let listItems;
    if(this.props.commands){
      listItems = Object.keys(this.props.commands).map(key => {
      let listItem = this.props.commands[key]

      return (
          <ListItem key={key}>
            <ListItemText
              primary={listItem}
            />
          </ListItem>
        );
      });
    } else {
      listItems = "No available commands."
    }
    
    // if(this.props.commands) {
    //   this.props.commands.forEach(value => {
    //     console.log('item value', value)
    //     console.log('item listItems', listItems)
    //       listItems += 
    //           <ListItem>
    //             <ListItemText
    //               primary={'asdffadsfsafsadfas'}
    //             />
    //           </ListItem>
          
    //   })
    //   console.log('item listItems', listItems)

    // }

    return (    
        <div>  
          <IconButton 
          className={fixed ? classes.hint : null} 
          onClick={this.handleClick}
            color="inherit"
          >
            <LightbulbOutline />
          </IconButton>

            <FullScreenDialog 
                  title="Voice Options"
                  fullScreen={false}
                  open={this.state.showingVoiceHint}
                  onClose={this.handleClick}
                  pageContent={
                    <List dense={true}>
                      {listItems}
                    </List>
                  }
              />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    commands: state.commandsState.commands,
});
  
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VoiceHint));