import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'

class SignOutButton extends React.Component {
  render() {
    const { onAuthSignOut } = this.props;

    return (<Button
      type="button"
      onClick={(event) => onAuthSignOut(null)}
      variant="raised" 
      color="secondary"
    >
      Sign Out
    </Button>);
  }
}
  
const mapDispatchToProps = (dispatch) => ({
    onAuthSignOut: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser })
});

export default connect(null, mapDispatchToProps)(SignOutButton);