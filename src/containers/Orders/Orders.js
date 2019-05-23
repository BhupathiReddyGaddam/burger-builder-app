import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        showSpinner: true,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-9527b.firebaseio.com/orderSummary.json')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({showSpinner: false, orders: fetchedOrders});
            })
            .catch(error => {
                this.setState({showSpinner: false});
            });
    }
    render(props) {
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
                ))}
            </div>
        );
    }
}
export default WithErrorHandler(Orders, axios);