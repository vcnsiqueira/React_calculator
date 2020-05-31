import React from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    titulo: {
        textAlign: 'center',
        color: '#3949ab'
    }
})

const Title = props => {
    const { title } = props;
    const classes = useStyles();
    return(
        <Typography className={classes.titulo} variant="h2" component="h1">{title}</Typography>
    );
};

export default Title