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
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import TextField from 'material-ui/TextField/TextField';
import Button from 'material-ui/Button';

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
  listItemText: {
    overflowX: 'auto',
  },
});

// TODO: this is for firebase objects, make it work with
// other types of objects as well. HINT: fb items dont have the items.
class InteractiveList extends React.Component {
  state = {
    dense: false,
    items: [],
    editKey: null,
    editTitle: '',
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

  editItem(key, item) {
    if(this.props.editItem) {
      this.props.editItem(key)
    } else {
      console.log('No editItem func given')
    }
    this.setState({editKey: key, editTitle: item.title})
  }
  editItemTitle(key, title) {
    if(this.props.editItemTitle) {
      this.props.editItemTitle(key, title)
      this.setState({editKey: ''})
    } else {
      console.log('No editItemTitle func given');
    }
  }

  itemEditKeyPress(e, key) { 
    if(e.key === 'Enter' && e.target.value !== "")
    {
      this.editItemTitle(key, e.target.value);
      
      e.preventDefault();
    } else if(e.key !== 'Enter') { 
      this.setState({editTitle: e.target.value + e.key})
    } else {
      // TODO: display error
    }
  }

  itemEditKeyDown = (e, key) => {
    if(e.keyCode == 8 && e.target.value !== "") { // backspace
      this.setState({editTitle: e.target.value.slice(0,-1)})
    }
  }

  render() {
    const { classes, getSecondary} = this.props;
    const { dense, editKey } = this.state;
    

    let listItems;
    if(this.props.items){
      listItems = Object.keys(this.props.items).map(key => {
      let listItem = this.props.items[key]
      let secondary = getSecondary ? getSecondary(key) : null

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
                      className={classes.listItemText}
                      primary={listItem.title}
                      secondary={secondary}
                      onClick={this.editItem.bind(this, key, listItem)}
                    />
                    :
                      <TextField 
                      id="with-placeholder"
                      margin="normal"
                      value={this.state.editTitle}
                      onKeyPress={(e)=> this.itemEditKeyPress(e, key)}
                      onKeyDown={(e)=> this.itemEditKeyDown(e, key)}
                      />  
                    }
                    { !!this.props.bonusButtonOneTitle
                    ? <ListItemIcon>
                      <Button 
                        variant="raised"
                        size="small"
                        color="primary"
                        margin="normal"
                        onClick={(e)=> this.props.bonusButtonOneOnClick(key)}
                        >
                      {this.props.bonusButtonOneTitle}
                      </Button>
                    </ListItemIcon> : null }
                    { !!this.props.bonusButtonTwoTitle
                    ? <ListItemIcon>
                      <Button 
                        variant="raised"
                        size="small"
                        color="primary"
                        margin="normal"
                        onClick={(e)=> this.props.bonusButtonTwoOnClick(key)}
                        >
                      {this.props.bonusButtonTwoTitle}
                      </Button>
                    </ListItemIcon> : null }

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