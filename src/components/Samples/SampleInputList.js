import React, { Component } from 'react';

import {InteractiveList, InteractiveListWithAddButton} from '../InteractiveList'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';

const SampleInputList = ({classes, handleChange, sample}) =>
    <List>
      <ListItem>
        <GenericTextField
          id="title"
          label="Sample Title"
          classes={classes}
          handleChange={handleChange}
          value={sample.title}
        />   
    </ListItem>
    <ListItem>
        <GenericTextField
          id="top"
          label="Top"
          classes={classes}
          type="number"
          handleChange={handleChange}
          value={sample.top}
        />        
        <GenericTextField
            id="bottom"
            label="Bottom"
            classes={classes}
            handleChange={handleChange}
            value={sample.bottom}
            type="number"
          />          
      </ListItem>
      <ListItem>
        <GenericTextField
            id="spt"
            label="SPT"
            classes={classes}
            handleChange={handleChange}
            value={sample.spt}
          />          
      </ListItem>
      <ListItem>
        <GenericTextField
            id="pocketPen"
            label="Pocket Pen"
            classes={classes}
            handleChange={handleChange}
            value={sample.pocketPen}
          />      
        <GenericTextField
            id="rimak"
            label="Rimak"
            classes={classes}
            handleChange={handleChange}
            value={sample.rimak}
          />          
      </ListItem>
      <ListItem>
        <GenericTextField
            id="recovery"
            label="Recovery"
            classes={classes}
            handleChange={handleChange}
            value={sample.recovery}
          />          
      </ListItem>
      {/* <Divider /> */}
    </List>

const GenericTextField = ({classes, handleChange, id, label, type, value}) =>
<TextField
    id={id}
    label={label}
    className={classes.textField}
    onChange={(e)=> handleChange(e, id)}
    margin="normal"
    type={type}
    value={value}
/>    

export default SampleInputList