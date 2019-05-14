import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Meat", type:"meat"},
    {label:"Cheese", type:"cheese"},
    {label:"Bacon", type:"bacon"}
];

const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
              return <BuildControl 
              key={ctrl.label} 
              label={ctrl.label} 
              addIn={() => props.addMoreIngredients(ctrl.type)}
              lessIn={() => props.reomveIngredients(ctrl.type)}
              disabled={props.disabled[ctrl.type]}/> 
            })}
            <button className={classes.OrderButton}
            onClick={props.orderNowButtonClick} 
            disabled={!props.purchaseable}>ORDER NOW</button>
        </div>
    );
}
export default BuildControls;