import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import classNames from 'classnames'

const BoringInfo = ({classes, onSave, onAutoFillLocation, handleChange, boring}) => 
<div>
        <GenericTextFormControl
            id='groundSurfaceElevationFt'
            classes={classes}
            value={boring.groundSurfaceElevationFt}
            handleChange={handleChange}
            helperText='Ground Surface Elevation'
            endAdornment={<InputAdornment position="end">ft</InputAdornment>}
        />
        <GenericTextFormControl
            id='driller'
            classes={classes}
            value={boring.driller}
            handleChange={handleChange}
            helperText='Driller'
        />
        <GenericTextFormControl
            id='engineer'
            classes={classes}
            value={boring.engineer}
            handleChange={handleChange}
            helperText='Engineer'
        />
        <GenericTextFormControl
            id='latitude'
            classes={classes}
            value={boring.latitude}
            handleChange={handleChange}
            helperText='Latitude'
            endAdornment={<InputAdornment position="end">°</InputAdornment>}
            endButton={
                <Button 
                    color="primary"
                    className={classes.button}
                    onClick={onAutoFillLocation}
                    variant="raised">
                    Use My Location
                </Button>
                }
        />
        <GenericTextFormControl
            id='longitude'
            classes={classes}
            value={boring.longitude}
            handleChange={handleChange}
            helperText='Longitude'
            endAdornment={<InputAdornment position="end">°</InputAdornment>}
            endButton={
                <Button 
                    color="primary"
                    className={classes.button}
                    onClick={onAutoFillLocation}
                    variant="raised">
                    Use My Location
                </Button>
                }
        />

    <Button 
        color="secondary"
        className={classes.button}
        onClick={onSave}
        variant="raised">
        Save
    </Button>
</div>

const GenericTextFormControl = ({classes, id, value, handleChange, helperText, endAdornment, endButton}) =>
<FormControl
    className={classNames(classes.formControl, classes.withoutLabel)}
    aria-describedby={`${id}-helper-text`}
    >
    <Input
    id={id}
    value={value}
    onChange={handleChange(id)}
    endAdornment={endAdornment}
    />
    {endButton}
    <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
</FormControl>   

export default BoringInfo