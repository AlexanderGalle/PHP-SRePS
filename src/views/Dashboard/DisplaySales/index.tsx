import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DisplaySales from './DisplaySales';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={DisplaySales} />
            <Route path='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    </BrowserRouter>
);
