import React from 'react';

const DeleteButton = props => {
    return(
        <button id="C/AC" onClick={props.handleDelete}>{props.deleteButton}</button>
    );
};

export default DeleteButton;