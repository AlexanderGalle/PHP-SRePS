import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={Dashboard} />
            <Route path='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    </BrowserRouter>
)
