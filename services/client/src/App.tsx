import React from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Login, Register } from "@pages";

const Hello: React.FC = () => {
  return (
    <Router>
      <AnimatePresence>
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
      </AnimatePresence>
    </Router>
  );
};

export default Hello;
