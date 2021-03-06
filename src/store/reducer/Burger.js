import * as actionTypes from '../actions/ActionTypes';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 0.3,
    cheese: 0.6,
    bacon: 0.9
};

const Reducer = (state= initialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.SET_INGREDIENT):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case(actionTypes.FETCH_INGREDIENTFAILED):
            return {
                ...state,
                error: true
            }
    }
    return state;
}
export default Reducer;