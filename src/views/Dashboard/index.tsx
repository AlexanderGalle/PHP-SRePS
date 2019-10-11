import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import SalesRecord from "./SalesRecord";
import PointOfSale from "./PointOfSale";
import SalesPrediction from "./SalesPrediction";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/inventory" component={Inventory} />
      <Route exact path="/sales" component={SalesRecord} />
      <Route exact path="/pos" component={PointOfSale} />
      <Route exact path="/predict" component={SalesPrediction} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </BrowserRouter>
);
