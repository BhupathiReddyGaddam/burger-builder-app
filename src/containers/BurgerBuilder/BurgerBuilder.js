import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    // State = {
    //     Burger = [
    //         {borderTopType="border-top"},
    //         {meatType="meat"},
    //         {cheeseType="cheese"},
    //         {saladType="salad"},
    //         {borderBottomType="border-bottom"}
    //     ]
    // };
    render() { 
        return(
            <Aux>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        );
    }
}
export default BurgerBuilder;