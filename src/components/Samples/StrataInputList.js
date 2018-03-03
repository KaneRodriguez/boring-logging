import React, { Component } from 'react';

import {InteractiveList, InteractiveListWithAddButton} from '../InteractiveList'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';

const StrataInputList = ({classes}) =>
    <List>
      <ListItem>
      <TextField
          id="top"
          label="Top"
          className={classes.textField}
          margin="normal"
        />          
    </ListItem>
      <ListItem>
        <TextField
            id="soil-description"
            label="Soil Description"
            className={classes.textField}
            margin="normal"
          />          
      </ListItem>
      <ListItem>
        <TextField
            id="bottom"
            label="Bottom"
            className={classes.textField}
            margin="normal"
            placeholder="End Previous Strata"
          />          
      </ListItem>
    </List>

export default StrataInputList