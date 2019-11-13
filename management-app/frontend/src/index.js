import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { acControlReducer } from './services/session/ACControl/reducer';
import { toastReducer } from './services/session/Toast/reducer';


// const store = createStore(reducer, applyMiddleware(thunk));

const reducer = combineReducers({
    acControlReducer, toastReducer
})


const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(<Provider store = {store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
