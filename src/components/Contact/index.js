import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class ContactForm extends Component {

  render() {
    const { history, authUser } = this.props;

    return (
        <div>
            <TextField
                defaultValue="Full Name"
            />

            <TextField
                defaultValue="Email Address "
            />

            <TextField
                defaultValue="Message"
            />

            
            <Button variant="raised" color="primary">
                Submit
            </Button>

            
        </div>
    );
  }
}

export default ContactForm;
