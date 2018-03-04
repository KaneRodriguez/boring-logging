import React from 'react';

import List, { ListItem } from 'material-ui/List';
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
        id="soilName"
        label="Soil Name"
        classes={classes}
        handleChange={handleChange}
        value={strata.soilName}
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
        <GenericTextField
            id="soilDescription"
            label="Soil Description"
            classes={classes}
            handleChange={handleChange}
            value={strata.soilDescription}
          />          
      </ListItem>
      <ListItem>
        <GenericTextField
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