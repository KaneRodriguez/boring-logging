import React from 'react'

import InteractiveList from './InteractiveList'
import TextField from 'material-ui/TextField'

const InteractiveListWithTextField = ({ name, items, removeItem, editItem, selectItem, 
  keyPress, editItemTitle, extraHeader, getSecondary }) =>
  <div>
    <h2>My {name}s {!!extraHeader ? ": " + extraHeader: ''}</h2>
    <TextField
    id="with-placeholder"
    label={`Add New ${name}`}
    placeholder={`${name} Name`}
    margin="normal"
    onKeyPress={keyPress}
    />  
    <InteractiveList 
    listName={`Saved ${name}s`}
    getSecondary={getSecondary}
    items={items} 
    removeItem={removeItem}
    selectItem={selectItem}
    editItem={editItem}
    editItemTitle={editItemTitle}
    /> 
  </div>

export default InteractiveListWithTextField