import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";
const AuthenticatedRoutes = ({ component: Comp, loggedIn, path, ...rest }) => {
  loggedIn = false;
  if (cookie.load("username") !== undefined) {
    loggedIn = true;
  }
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!"
              }
            }}
          />
        );
      }}
    />
  );
};
export default AuthenticatedRoutes;