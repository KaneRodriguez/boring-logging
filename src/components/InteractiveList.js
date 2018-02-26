import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import Input from 'material-ui/Input/Input';
import TextField from 'material-ui/TextField/TextField';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

// TODO: this is for firebase objects, make it work with
// other types of objects as well. HINT: fb items dont have the items.
class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
    items: [],
    editKey: null,
  };
  constructor(props) {
    super(props)

    this.itemEditKeyPress = this.itemEditKeyPress.bind(this)
    this.editItemTitle = this.editItemTitle.bind(this)
  }
  removeItem(key) {
    if(this.props.removeItem) {
      this.props.removeItem(key)
    } else {
      console.log('No removeItem func given')
    }
  }

  selectItem(key) {
    if(this.props.selectItem) {
      this.props.selectItem(key)
    } else {
      console.log('No selectItem func given')
    }
  }

  editItem(key) {
    if(this.props.editItem) {
      console.log('calling editItem func above')
      this.props.editItem(key)
    } else {
      console.log('No editItem func given')
    }
    console.log('editing the item ')
    this.setState({editKey: key})
  }
  editItemTitle(key, title) {
    if(this.props.editItemTitle) {
      console.log('calling hoc function editItemTitle and clearing key')
      this.props.editItemTitle(key, title)
      this.setState({editKey: ''})
    } else {
      console.log('No editItemTitle func given');
    }
  }

  itemEditKeyPress(e, key) {
    const { authUser, onSetUserProjects } = this.props;
 
    console.log('pressed some key')
    if(e.key === 'Enter' && e.target.value !== "")
    {
      console.log('pressed enter')
      this.editItemTitle(key, e.target.value);
      e.preventDefault();
    }
  }

  render() {
    const { classes } = this.props;
    const { dense, secondary, editKey } = this.state;
    
    let listItems;
    if(this.props.items){
      listItems = Object.keys(this.props.items).map(key => {
      let listItem = this.props.items[key]
      return (
          <ListItem key={key}>
                    <ListItemAvatar onClick={this.selectItem.bind(this, key)}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    {editKey !== key
                    ?
                    <ListItemText
                      primary={listItem.title}
                      secondary={secondary ? 'Secondary text' : null}
                      onClick={this.editItem.bind(this, key)}
                    />
                    :
                      <TextField 
                      id="with-placeholder"
                      label={listItem.title}
                      placeholder={'New Title'}
                      margin="normal"
                      onKeyPress={(e)=> this.itemEditKeyPress(e, key)}
                      />  
                    }
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={this.removeItem.bind(this, key)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }

    return (
      <div className={classes.root}>
          <Grid item xs={12} md={6}>
          {this.props.listName ? (
            <Typography variant="title" className={classes.title}>
            {this.props.listName}
            </Typography>
          ) : null}

            <div className={classes.demo}>
              <List dense={dense}>
                {listItems}
              </List>
            </div>
          </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
  removeItem: PropTypes.func,
  selectItem: PropTypes.func,
  editItemTitle: PropTypes.func,
};

export default withStyles(styles)(InteractiveList);