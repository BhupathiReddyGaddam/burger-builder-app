import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //["salad", "1"]
    //         if(param[0] === 'price' ) {
    //             price = param[1];
    //         }else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack('/');
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(props) {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ing}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.ingredients
    }
}

export default connect(mapStateToProps) (CheckOut);