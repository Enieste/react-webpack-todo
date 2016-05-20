'use strict';

import './main.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import TodoPage from './pages/todo.jsx';
import HomePage from './pages/home.jsx';
import SignIn from './pages/signIn.jsx';
import SignUp from './pages/signUp.jsx';
import appReducers from './reducers';

const store = createStore(
    appReducers,
    applyMiddleware(routerMiddleware(hashHistory))
);

const history = syncHistoryWithStore(hashHistory, store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={HomePage}>
                <Route path="signIn" component={SignIn} />
                <Route path="signUp" component={SignUp} />
                <Route path="todo" component={TodoPage} />
            </Route>
        </Router>
    </Provider>
), document.querySelector('#app'));
