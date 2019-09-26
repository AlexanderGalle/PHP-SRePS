import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import Inventory from './Inventory';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/tables' component={ProductList} />
            <Route exact path='/inventory' component={Inventory} />
            <Route path='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    </BrowserRouter>
);
