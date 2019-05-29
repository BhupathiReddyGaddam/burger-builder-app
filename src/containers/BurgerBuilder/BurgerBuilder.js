import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Action';

class BurgerBuilder extends Component {
    state = {
        showModal: false,
        showSpinner: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://burger-builder-9527b.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
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
            return sum > 0;
    }

    // addMoreSideHandler = (type) => {
    //     const oldCount = this.props.ing[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ing
    //     };
    //     updatedIngredients[type] = updateCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // lessSideHandler = (type) => {
    //     const previousCount = this.props.ing[type];
    //     if(previousCount <= 0) {
    //         return;
    //     }
    //     const minusCount = previousCount - 1;
    //     const removedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     removedIngredients[type] = minusCount;
    //     const priceSubstraction = INGREDIENT_PRICES[type];
    //     const previousPrice = this.state.totalPrice;
    //     const lessPrice = previousPrice - priceSubstraction;
    //     this.setState({totalPrice: lessPrice, ingredients: removedIngredients});
    //     this.updatePurchaseState(removedIngredients);
    // }

    showOrderSummaryHandler = () => {
        const doesShow = this.state.showModal;
        this.setState({showModal : !doesShow});
    }

    closeOrderSummaryHandler = () => {
        this.setState({showModal: false});
    }

    purchaseContinueHandler = () => {
        //alert('You can continue!');
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
        
    }

    render() { 
        const disabledInfo = {
            ...this.props.ing
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let burger = (
            this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        );
        let orderSummary = null;
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls 
                    addMoreIngredients={this.props.addMoreIngredient}
                    reomveIngredients={this.props.removeIngredient}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ing)}
                    orderNowButtonClick={this.showOrderSummaryHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.props.ing}
                purchaseClose = {this.closeOrderSummaryHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                finalPrice = {this.props.price}/>
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
const mapStateToProps = (state) => {
    return {
        ing: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMoreIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        removeIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
//export default WithErrorHandler(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder));