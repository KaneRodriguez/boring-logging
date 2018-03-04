import React, { Component } from 'react';

import {InteractiveList, InteractiveListWithAddButton} from '../InteractiveList'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {GenericTextField} from '../Samples/SampleInputList' // todo: move the generic textfield somewhere else

const StrataInputList = ({classes, handleChange, strata}) =>
    <List>
      <ListItem>
      <GenericTextField
        id="title"
        label="Strata Title"
        classes={classes}
        handleChange={handleChange}
        value={strata.title}
        />          
    </ListItem>
    <ListItem>
      <GenericTextField
        id="top"
        label="Top"
        classes={classes}
        handleChange={handleChange}
        value={strata.top}
        type="number"
        />          
    </ListItem>
      <ListItem>
        <TextField
            id="soilDescription"
            label="Soil Description"
            classes={classes}
            handleChange={handleChange}
            value={strata.soilDescription}
          />          
      </ListItem>
      <ListItem>
        <TextField
            id="bottom"
            label="Bottom"
            classes={classes}
            placeholder="End Previous Strata"
            handleChange={handleChange}
            value={strata.bottom}
          />          
      </ListItem>
    </List>

export default StrataInputList