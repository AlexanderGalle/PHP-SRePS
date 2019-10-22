import React from "react";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupScreen} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
