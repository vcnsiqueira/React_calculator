import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonOperation: {
        width: props => parseInt(props.size) * 100,
        height: 50,
        backgroundColor: '#3f51b5',
            "&:hover": {
                backgroundColor: '#ef9a9a'
            },
        borderRadius: 1,
        border: 1, 
        borderColor: '#FFF',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonNormal: {
        width: props => parseInt(props.size) * 100,
        height: 50,
        backgroundColor: '#bbdefb',
            "&:hover": {
                backgroundColor: '#ef9a9a'
            },          
        borderRadius: 1,
        border: 1,
        borderColor: '#FFF',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    }
});

const CustomButton = props => {
    const { buttonOperation, buttonNormal } = useStyles(props);
    if(props.type === 'Normal') {
        return(
            <Button className={`${buttonNormal}`} variant="contained" onClick={event => props.onClick(event, props.id)}>{props.buttonTitle}</Button>
        );
    }
    return(
        <Button className={`${buttonOperation}`} variant="contained" id={props.id} onClick={event => props.onClick(event, props.id)}>{props.buttonTitle}</Button>
    );
    
};

export default CustomButton;