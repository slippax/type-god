import React from 'react'
import Words from './words/words';
import classes from './type.module.css'
const type = () => {
    return (
<div className={classes.gameBox}><Words/></div>
    );
}

export default type;
