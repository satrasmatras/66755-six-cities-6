import React from "react";
import {Redirect, Route} from "react-router";
import {AuthorizationStatus} from "../../store/user/slice";
import Routes from "../../routes";
import {connect} from "react-redux";
import {RootState} from "../../store";
import Loader from "../loader";

interface PrivateRouteProps {
  path: string,
  exact: boolean,
  render: any,
  authorizationStatus: AuthorizationStatus
}

const PrivateRoute = ({render, authorizationStatus, ...rest}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        switch (authorizationStatus) {
          case AuthorizationStatus.UNKNOWN:
            return <Loader/>;
          case AuthorizationStatus.NO_AUTH:
            return <Redirect to={Routes.LOGIN}/>;
          case AuthorizationStatus.AUTH:
            return render(routeProps);
        }
      }
      }
    />
  );
};

const mapStateToProps = ({user}: RootState) => ({
  authorizationStatus: user.authorizationStatus
});

export default connect(mapStateToProps)(PrivateRoute);
