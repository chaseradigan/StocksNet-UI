import React, { Component } from "react";
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import AllStocks from "./pages/AllStocks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";

export default class App extends Component {

  render() {
    return (
      <div className="App" style={{height:'100vh'}}>
        <Router>
          <Switch>
            <React.Fragment>
              <Route component={Navigation}/>
              <Route exact path="/" component={HomePage} />
              <AuthenticatedRoutes exact path="/allstocks" component={AllStocks} loggedIn={true}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
            </React.Fragment>
          </Switch>
        </Router>
      </div>
    )
  }
}

