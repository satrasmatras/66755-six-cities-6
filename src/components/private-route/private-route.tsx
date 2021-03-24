import React from "react";
import {Redirect, Route} from "react-router";
import {AuthorizationStatus} from "../../store/user/slice";
import Routes from "../../routes";
import {connect} from "react-redux";
import {RootState} from "../../store";

interface PrivateRouteProps {
  path: string,
  exact: boolean,
  render: any,
  authorizationStatus: AuthorizationStatus
}

const PrivateRoute = ({render, path, exact, authorizationStatus}: PrivateRouteProps) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={Routes.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = ({user}: RootState) => ({
  authorizationStatus: user.authorizationStatus
});

export default connect(mapStateToProps)(PrivateRoute);
