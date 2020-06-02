import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyles: {
        width: props => parseInt(props.size) * 100,
        height: 50,
        backgroundColor: props => props.type === 'Operation' ? '#3f51b5' : '#bbdefb',
            "&:hover": {
                backgroundColor: '#ef9a9a'
            },
        borderRadius: 1,
        border: 1, 
        borderColor: '#FFF',
        color: props => props.type === 'Operation' ? '#FFF' : '#000',
        fontWeight: 'bold',
        fontSize: 20
    }
});

const CustomButton = props => {
    const classes = useStyles(props);
    if(props.type === 'Normal') {
        return(
            <Button className={classes.buttonStyles} variant="contained" onClick={event => props.onClick(event, props.id)}>{props.buttonTitle}</Button>
        );
    }
    return(
        <Button className={classes.buttonStyles} variant="contained" id={props.id} onClick={event => props.onClick(event, props.id)}>{props.buttonTitle}</Button>
    );
    
};

export default CustomButton;