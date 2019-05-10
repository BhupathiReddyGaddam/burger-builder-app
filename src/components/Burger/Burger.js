import React from 'react';
import classes from './Burger.css';
import Burgeringredient from './Burgeringredients/Burgeringredients';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map(( _, i ) => {
                return <Burgeringredient key={igKey + i} type={igKey}/>;
            });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    console.log(transformedIngredients);
    if(transformedIngredients == 0) {
        transformedIngredients = <p>Please add ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top"/>
            {transformedIngredients}
            <Burgeringredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;