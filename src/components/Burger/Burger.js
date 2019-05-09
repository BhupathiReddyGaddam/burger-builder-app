import React from 'react';
import classes from './Burger.css'
import Burgeringredient from './Burgeringredients/Burgeringredients';

const Burger = () => {
    return(
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top"/>
            <Burgeringredient type="meat"/>
            <Burgeringredient type="cheese"/>
            <Burgeringredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;