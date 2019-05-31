import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    orders: [],
    showSpinner: false
}
const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case(actionTypes.PURCHASE_BURGER_START):
            return {
                ...state,
                showSpinner: true
            }
        case(actionTypes.PURCHASE_BURGER_SUCCESS):
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        };
            return {
                ...state,
                showSpinner: false,
                orders: state.orders.concat(newOrder)
            };
        case(actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                showSpinner: false
            };
    };
    return state;
};
export default orderReducer;