import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Tastty Burger</h1>
            <div style={{width: '300', height: '300'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
            btnType="Success"
            clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}
export default CheckoutSummary;