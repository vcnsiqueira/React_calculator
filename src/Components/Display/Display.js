import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    calculatorDisplay: {
        backgroundColor: '#CCC',
        width: 400,
        textAlignLast: 'right',
    }
});


const Display = props => {
    const classes = useStyles();
    return(
        <TextField className={classes.calculatorDisplay} type="number" maxLength="10" variant="outlined" onChange={props.onChange} value={props.value}/>
    );
}

export default Display;