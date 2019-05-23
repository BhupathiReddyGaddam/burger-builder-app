import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios/axios';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:''
            },
            Door: {
                element: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Door Number'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value:''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter Zipcode'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email Id'
                },
                value: ''
            },
            delvery: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {
                           value: 'Fastest',
                           displayValue: 'Fastest'
                       },
                       {
                           value: 'Cheapest',
                           displayValue: 'Cheapest'
                       }
                   ]
                },
                value: ''
            }
        },

        showSpinner: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({showSpinner: true});
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({showSpinner: false});
            this.props.history.push('/');
        })
        .catch(error => {
            //console.log(error);
            this.setState({showSpinner: false});
        });
    }

    updateInputElementHandler = (event, inputIdentifier) => {
        //console.log(updateInputElementHandler);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    render() {
        const formElement = [];
        for(let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
            {formElement.map(formElement => {
                return <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.updateInputElementHandler(event, formElement.id)}/>
            })}
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if(this.state.showSpinner) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <p>The total price is:{this.props.price}</p>
                {form}
            </div>
        );
    }
}
export default ContactData;