import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import User from "./components/User";

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <header></header>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/userlist" />} />
            <Route exact path="/userlist" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
