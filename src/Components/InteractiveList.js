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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
    items: []
  };

  removeItem(item) {
    this.props.removeItem(item);
  }

  selectItem(item) {
    this.props.selectItem(item);
  }

  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    let listItems;
    if(this.props.items){
      listItems = this.props.items.map(listItem => {
        return (
          <ListItem>
                    <ListItemAvatar onClick={this.selectItem.bind(this, listItem)}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={listItem.title}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={this.removeItem.bind(this, listItem)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }
    console.log(this.props.items);

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
  selectItem: PropTypes.func
};

export default withStyles(styles)(InteractiveList);