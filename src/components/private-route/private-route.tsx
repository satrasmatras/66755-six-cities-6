import React from "react";
import {Redirect, Route} from "react-router";
import {AuthorizationStatus} from "../../store/user/slice";
import Routes from "../../routes";
import {RootState} from "../../store";
import Loader from "../loader";
import {useSelector} from "react-redux";

interface PrivateRouteProps {
  path: string,
  exact: boolean,
  render: any,
}

const PrivateRoute = ({render, ...rest}: PrivateRouteProps) => {
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

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

export default PrivateRoute;
