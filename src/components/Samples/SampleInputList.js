import React from 'react';

import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';

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
        <div className={classes.pocketPen}>
          <Grid container spacing={24}>
            <Grid item xs={4} small={3}>
              <GenericTextField
                id="sptOne"
                label="S"
                ////classes={classes}
                handleChange={handleChange}
                value={sample.sptOne}
              /> 
            </Grid>
            <Grid item xs={4} small={3}>
              <GenericTextField
                id="sptTwo"
                label="P"
                //classes={classes}
                handleChange={handleChange}
                value={sample.sptTwo}
              /> 
            </Grid>
            <Grid item xs={4} small={3}>
              <GenericTextField
                  id="sptThree"
                  label="T"
                  //classes={classes}
                  handleChange={handleChange}
                  value={sample.sptThree}
              />        
            </Grid>
          </Grid>
        </div>  
      </ListItem>
      <ListItem>
        <div className={classes.pocketPen}>
          <Grid container spacing={24}>
            <Grid item xs={4} small={3}>
              <GenericTextField
                id="pocketPenOne"
                label="PP1"
                // classes={classes}
                handleChange={handleChange}
                value={sample.pocketPenOne}
                /> 
            </Grid>
            <Grid item xs={4} small={3}>
              <GenericTextField
                id="pocketPenTwo"
                label="PP2"
                //classes={classes}
                handleChange={handleChange}
                value={sample.pocketPenTwo}
              /> 
            </Grid>
            <Grid item xs={4} small={3}>
              <GenericTextField
                id="pocketPenThree"
                label="PP3"
                // classes={classes}
                handleChange={handleChange}
                value={sample.pocketPenThree}
                /> 
            </Grid>
          </Grid>
        </div>
    </ListItem>
      <ListItem>
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
    </List>

const GenericTextField = ({classes, handleChange, id, label, type, value}) =>
<TextField
    id={id}
    label={label}
    className={classes ? classes.textField : null}
    onChange={(e)=> handleChange(e, id)}
    margin="normal"
    type={type}
    value={value}
/>    

export default SampleInputList

export {
  GenericTextField
}