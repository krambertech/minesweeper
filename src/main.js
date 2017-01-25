import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import App from './components/App.jsx';
import GamePage from './containers/GamePage.jsx';
import StartPage from './components/StartPage.jsx';

import store from './store';

import 'normalize.css';
import './assets/main.css';

const routes = (
    <Route component={App}>
        <Redirect from="/" to="start" />
        <Route path="start" component={StartPage} />
        <Route path="game" component={GamePage} />
    </Route>
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
