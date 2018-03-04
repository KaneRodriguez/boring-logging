import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {

  render() {
    const { authUser, classes, onSetNavMenuAnchor, anchorEl } = this.props
     
    const open = Boolean(anchorEl);
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="Menu"
            onClick={(event)=> onSetNavMenuAnchor(event.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={(event)=> onSetNavMenuAnchor(null)}
            >
              <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                <Link to={routes.LANDING}>Landing</Link>
              </MenuItem>
            {  authUser 
              ? (<div>
                  <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                    <Link to={routes.HOME}>Home</Link>
                  </MenuItem>
                  <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                    <Link to={routes.ACCOUNT}>Account</Link>
                  </MenuItem>
                  <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                    <SignOutButton />
                  </MenuItem>
                </div>
              )
              : (<div>
                  <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                    <Link to={routes.SIGN_IN}>Sign In</Link>
                  </MenuItem>
                  <MenuItem onClick={(event)=> onSetNavMenuAnchor(null)}>
                    <Link to={routes.SIGN_UP}>Sign Up</Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Boring Logging
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  anchorEl: state.navState.anchorEl,
  authUser: state.sessionState.authUser,
});
  
const mapDispatchToProps = (dispatch) => ({
    onSetNavMenuAnchor: (anchorEl) => dispatch({ type: 'SET_NAV_MENU_ANCHOR', anchorEl })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuAppBar));