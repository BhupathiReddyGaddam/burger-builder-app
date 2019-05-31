import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Reducer from './store/reducer/Burger';
import orderReducer from './store/reducer/Order';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    burgerReducer: Reducer,
    orderReducer: orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

const root = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>, 
root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
