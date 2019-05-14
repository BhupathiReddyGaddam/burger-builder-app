import React from 'react';
import Aux from '../../../hoc/Auxilliary';

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform: "capitalize"}}>{igKey}</span>:{props.ingredients[igKey]}</li>
    });
    return(
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to check out?</p>
        </Aux>
    );
};
export default OrderSummary;