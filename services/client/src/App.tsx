import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Hello: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Hello, World</h1>
        </Route>
        <Route exact path="/login">
          <h1>Login page</h1>
        </Route>
        <Route exact path="/register">
          <h1>Register page</h1>
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Hello;
