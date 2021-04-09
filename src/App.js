import React, { Component } from "react";
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllStocks from "./pages/AllStocks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import cookie from 'react-cookies'
import FavoriteStocks from "./pages/FavoriteStocks";
import SingleStock from "./pages/SingleStock";
export default class App extends Component {
  constructor() {
    super();
    this.state={
      loggedIn:false
    }
  }
  componentDidMount(){
    this.authenticate();
  }
  authenticate(){
    if(cookie.load('username')!==undefined){
      this.setState({loggedIn:true})
    }
  }
  render() {
    return (
      <div className="App" style={{ height: '100vh' }}>
        <Router>
          <Switch>
            <React.Fragment>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/allstocks" component={AllStocks}/>
              <AuthenticatedRoutes exact path="/favorites" component={FavoriteStocks}  loggedIn={this.state.loggedIn}/>
              <AuthenticatedRoutes exact path="/stock/:ticker" component={SingleStock}  loggedIn={this.state.loggedIn}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </React.Fragment>
          </Switch>
        </Router>
      </div>
    )
  }
}

