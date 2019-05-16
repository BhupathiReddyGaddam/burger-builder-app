import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.finalPrice.toFixed(2)}</strong></p>
            <p>Continue to check out?</p>
            <Button btnType="Danger" clicked = {props.purchaseClose}>CANCEL</Button>
            <Button btnType="Success" clicked = {props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};
export default OrderSummary;