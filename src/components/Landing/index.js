import React, { Component } from 'react';
import { SignUpForm } from '../SignUp'
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import FullScreenDialog from '../Dialog'
import ContactForm from '../Contact'

class LandingPage extends Component {
  state = {
    contactDialogOpen: false
  }

  onCloseContactDialog = () => {
    this.setState({contactDialogOpen: false})
  }

  onOpenContactDialog = () => {
    this.setState({contactDialogOpen: true})
  }

  render() {
    const { history, authUser } = this.props;
    const { contactDialogOpen } = this.state;

    return (
      <div>
        <h1>Free Soil Logging - Voice Automated Input</h1>
        { !authUser ? <SignUpForm history={history} /> : '' } 
        <p><b>Makes soil logging extremely easy and fast</b></p>
        
        <p> Gone are the days when soil logging required using wet, dirty, and cold hands to record soil information. </p>
        <p> With this application, you can use your voice to input all necessary soil information. The app keeps record of all your projects and your logs for easy access in the future. </p>
        <p> Built in GPS to mark all the boring locations and generate 2D and 3D soil profiles of all the logs in a project</p>
        <FullScreenDialog 
            title="Contact Us"
            fullScreen={false}
            open={contactDialogOpen}
            onClose={this.onCloseContactDialog}
            //onSave={this.onSaveSampleDesc}
            //voiceHint={true}
            pageContent={
                <div>
                  <ContactForm/>
                </div>
            }
        />
        <Button color="primary" onClick={this.onOpenContactDialog}>
          Contact Us
        </Button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps, null)(LandingPage);
