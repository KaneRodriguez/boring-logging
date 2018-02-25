import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import * as routes from '../../constants/routes';
  
class SimpleMenuNonAuth extends React.Component {
    render() {
        const {onSetNavMenuAnchor, anchorEl } = this.props

        return (<div>
        <Button
            id="simple-button"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={ (event)=> onSetNavMenuAnchor(event.currentTarget) }
        >
            Open Menu
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
        >
            <MenuItem onClick={(event) => onSetNavMenuAnchor(null)}><Link to={routes.SIGN_IN}>Sign In</Link></MenuItem>
            <MenuItem onClick={(event) => onSetNavMenuAnchor(null)}><Link to={routes.LANDING}>Landing</Link></MenuItem>
        </Menu>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    anchorEl: state.navState.anchorEl,
});
  
const mapDispatchToProps = (dispatch) => ({
    onSetNavMenuAnchor: (anchorEl) => dispatch({ type: 'SET_NAV_MENU_ANCHOR', anchorEl })
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenuNonAuth)