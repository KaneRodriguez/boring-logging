import React from 'react'

import InteractiveList from './InteractiveList'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const InteractiveListWithAddButton = ({name, items, removeItem, selectItem, editItemTitle, addItem, 
classes, bonusButton1, bonusButton2, bonusButtonOneTitle, bonusButtonOneOnClick,
bonusButtonTwoTitle, bonusButtonTwoOnClick}) =>
<div>
    <InteractiveList 
        listName={`Saved ${name}s`}
        items={items} 
        removeItem={removeItem}
        selectItem={selectItem}
        editItemTitle={editItemTitle}
        bonusButtonOneTitle={bonusButtonOneTitle}
        bonusButtonOneOnClick={bonusButtonOneOnClick}
        bonusButtonTwoTitle={bonusButtonTwoTitle}
        bonusButtonTwoOnClick={bonusButtonTwoOnClick}
    /> 
    <Button variant="fab" color='primary' onClick={addItem} className={classes ? classes.fab : null}>
        <AddIcon />
    </Button>
</div>

export default InteractiveListWithAddButton