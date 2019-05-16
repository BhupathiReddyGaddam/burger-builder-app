import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem links="/" active>Burger Builder</NavigationItem>
            <NavigationItem links="/">Check Out</NavigationItem>
        </ul>
    );
}
export default NavigationItems;