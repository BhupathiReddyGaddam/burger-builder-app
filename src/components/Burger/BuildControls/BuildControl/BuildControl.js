import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => {
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.lessIn} disabled={props.disabled}>Less</button>
            <button onClick={props.addIn} className={classes.More}>MOre</button>
        </div>
    );
}
export default BuildControl;