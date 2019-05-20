import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 0.3,
    cheese: 0.6,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        showModal: false,
        showSpinner: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://burger-builder-9527b.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

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
        //alert('You can continue!');
        this.setState({showSpinner: true});
        const orderData = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Maxi',
                address: {
                    Door: '4850 156th Ave',
                    city: 'Redmond',
                    zip: 765444
                },
                email: 'maxi@gmail.com'
            },
            delvery: 'fastest'
        }
        axios.post('/orderSummary.json', orderData)
        .then(response => {
            //console.log(response);
            this.setState({showSpinner: false, showModal: false});
        })
        .catch(error => {
            //console.log(error);
            this.setState({showSpinner: false, showModal: false});
        });
    }

    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let burger = (
            this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        );
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients}
                purchaseClose = {this.closeOrderSummaryHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                finalPrice = {this.state.totalPrice}/>
            );
        }
        if(this.state.showSpinner) {
            orderSummary = (
                <Spinner/>
            );
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
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default WithErrorHandler(BurgerBuilder, axios);