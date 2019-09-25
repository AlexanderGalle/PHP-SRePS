import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductList from './ProductList';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/tables' component={ProductList} />
            <Route path='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    </BrowserRouter>
);
