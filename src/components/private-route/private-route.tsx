import React from "react";
import {Redirect, Route} from "react-router";
import {AuthorizationStatus} from "../../store/user/user";
import Routes from "../../routes";
import {RootState} from "../../store/store";
import Loader from "../loader/loader";
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
          case AuthorizationStatus.AUTH:
            return render(routeProps);
          case AuthorizationStatus.NO_AUTH:
          default:
            return <Redirect data-testid="redirect" to={Routes.LOGIN}/>;
        }
      }
      }
    />
  );
};

export default PrivateRoute;
