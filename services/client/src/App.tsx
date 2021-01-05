import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Login, Register } from "@pages";
import { Navbar } from "@components";

const Hello: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Hello;
