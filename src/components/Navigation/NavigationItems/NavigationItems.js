import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { Route } from 'react-router-dom';
import Layout from '../../../hoc/Layout/Layout';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Checkout from '../../../containers/Checkout/CheckOut';
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';

const NavigationItems = (props) => {
    return(
        <Aux>
            <ul className={classes.NavigationItems}>
                {/* <NavigationItem links="/" active>Burger Builder</NavigationItem> */}
                <NavigationItem links='/'>Burger Builder</NavigationItem>
                <NavigationItem links='/checkout'>Check Out</NavigationItem>
            </ul>
        </Aux>
    );
}
export default NavigationItems;