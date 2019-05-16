import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 0.3,
    cheese: 0.6,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchaseable: false,
        showModal: false
    };

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchaseable: sum > 0});
    }

    addMoreSideHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    lessSideHandler = (type) => {
        const previousCount = this.state.ingredients[type];
        if(previousCount <= 0) {
            return;
        }
        const minusCount = previousCount - 1;
        const removedIngredients = {
            ...this.state.ingredients
        };
        removedIngredients[type] = minusCount;
        const priceSubstraction = INGREDIENT_PRICES[type];
        const previousPrice = this.state.totalPrice;
        const lessPrice = previousPrice - priceSubstraction;
        this.setState({totalPrice: lessPrice, ingredients: removedIngredients});
        this.updatePurchaseState(removedIngredients);
    }

    showOrderSummaryHandler = () => {
        const doesShow = this.state.showModal;
        this.setState({showModal : !doesShow});
    }

    closeOrderSummaryHandler = () => {
        this.setState({showModal: false});
    }

    purchaseContinueHandler = () => {
        alert('You can continue!');
    }

    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        // let modal = null;
        // if(this.state.showModal) {
        //     modal = (
        //         <OrderSummary ingredients={this.state.ingredients}/>
        //     );
        // }
        return(
            <Aux>
                <Modal show = {this.state.showModal} backdropClicked = {this.closeOrderSummaryHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    purchaseClose = {this.closeOrderSummaryHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    finalPrice = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addMoreIngredients={this.addMoreSideHandler}
                reomveIngredients={this.lessSideHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                orderNowButtonClick={this.showOrderSummaryHandler}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;