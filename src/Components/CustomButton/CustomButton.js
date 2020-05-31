import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonOperation: {
        width: 100,
        height: 50,
        backgroundColor: '#283593',
        borderRadius: 1,
        border: 1, 
        borderColor: 'white',
        color: '#FFF'
    },
    buttonNormal: {
        backgroundColor: '#bbdefb',
        borderRadius: 1,
        color: '#FFF'
    }
});

const CustomButton = props => {
    const classes = useStyles();
    if(props.type === 'Normal') {
        return(
            <Button className={classes.buttonNormal} variant="contained" id={props.id} onClick={props.onClick}>{props.buttonTitle}</Button>
        );
    }
    return(
        <Button className={classes.buttonOperation} variant="contained" id={props.id} onClick={props.onClick}>{props.buttonTitle}</Button>
    );
    
};

export default CustomButton;