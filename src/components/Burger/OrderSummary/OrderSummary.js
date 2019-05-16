import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] will update');
    }
    render(props) {
        const ingredients = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: "capitalize"}}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
        });
        return(
            <Aux>
                <h3>Order Summary</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: {this.props.finalPrice.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked = {this.props.purchaseClose}>CANCEL</Button>
                <Button btnType="Success" clicked = {this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;