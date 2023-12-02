import logo from './logo.svg';
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Page1 from './Page1'
import Page2 from './Page2'

function App() {
  return (
    <Router>
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/page2"} component={Page2} />
          <Route component={Page1} />
        </Switch>
    </Router>
  );
}

export default App;
