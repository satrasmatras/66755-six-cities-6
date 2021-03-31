import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../services/browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthorizationStatus, initialState as userInitialState} from "../../store/user/slice";
import {initialState as favoritesInitialState} from "../../store/favorites/slice";
import thunk from "redux-thunk";
import PrivateRoute from "./private-route";
import Routes from "../../routes";
import FavoritesPage from "../favorites-page";

const mockStore = configureStore([thunk]);

const unknownUserInitialState = {
  ...userInitialState,
  authorizationStatus: AuthorizationStatus.UNKNOWN
};
const authUserInitialState = {
  ...userInitialState,
  authorizationStatus: AuthorizationStatus.AUTH
};
const noAuthUserInitialState = {
  ...userInitialState,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

it(`Private route should show loader correctly`, () => {
  browserHistory.push(Routes.FAVORITES);

  const {container} = render(
      <Provider store={mockStore({
        user: unknownUserInitialState,
      })}>
        <Router history={browserHistory}>
          <PrivateRoute
            exact
            path={Routes.FAVORITES}
            render={() => <FavoritesPage />}
          />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});

it(`Private route should open favorites correctly`, () => {
  browserHistory.push(Routes.FAVORITES);

  const {container} = render(
      <Provider store={mockStore({
        user: authUserInitialState,
        favorites: favoritesInitialState
      })}>
        <Router history={browserHistory}>
          <PrivateRoute
            exact
            path={Routes.FAVORITES}
            render={() => <FavoritesPage />}
          />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});

it(`Private route should open login form correctly`, () => {
  browserHistory.push(Routes.FAVORITES);

  const {container} = render(
      <Provider store={mockStore({
        user: noAuthUserInitialState,
        favorites: favoritesInitialState
      })}>
        <Router history={browserHistory}>
          <PrivateRoute
            exact
            path={Routes.FAVORITES}
            render={() => <FavoritesPage />}
          />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
