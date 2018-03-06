import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
// todo: maybe rename to AdjustableScreenDialog and have the fullscreen attribute below be passed in?
class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, classes, pageContent, title, open, onClose, onSave } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title ? title : ''}
              </Typography>

              {!!onSave // if no display option given, don't provide them with one!
              ? <Button color="inherit" onClick={onSave}>
                save
              </Button>
              : null 
              }
            </Toolbar>
          </AppBar>
          {pageContent}
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  title: PropTypes.string,
  //open: PropTypes.bool.isRequired,TODO
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // pageContent: PropTypes.isRequired,TODO
};

export default withStyles(styles)(FullScreenDialog);
