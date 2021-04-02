import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../store/user/slice";
import PrivateRoute from "./private-route";
import {MOCK_ADAPTED_AUTH_INFO, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";
import {createMemoryHistory, MemoryHistory} from "history";
import "@testing-library/jest-dom";
import {Route} from "react-router";

const unknownUserInitialState = {
  ...MOCK_INITIAL_STATE,
  user: {
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    authInfo: MOCK_ADAPTED_AUTH_INFO,
  }
};

const authUserInitialState = {
  ...MOCK_INITIAL_STATE,
  user: {
    authorizationStatus: AuthorizationStatus.AUTH,
    authInfo: MOCK_ADAPTED_AUTH_INFO,
  }
};

const noAuthUserInitialState = {
  ...MOCK_INITIAL_STATE,
  user: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authInfo: MOCK_ADAPTED_AUTH_INFO,
  }
};


describe(`Private route should work correctly`, () => {
  let history: MemoryHistory;
  let mockStore: any;

  beforeEach(() => {
    history = createMemoryHistory();
    mockStore = mockConfigureStore(history);
    history.push(`/private`);
  });

  it(`Private route should not be rendered`, async () => {
    render(
        <Provider store={mockStore(noAuthUserInitialState)}>
          <Router history={history}>
            <Route
              exact
              path={`/login`}
            >
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path={`/private`}
              render={() => <h1>Private Route</h1>}
            />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(/Public Route/i)).toBeInTheDocument();
    await expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it(`Private route should be render loading when unknown`, async () => {
    render(
        <Provider store={mockStore(unknownUserInitialState)}>
          <Router history={history}>
            <Route
              exact
              path={`/login`}
            >
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path={`/private`}
              render={() => <h1>Private Route</h1>}
            />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    await expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
    await expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
  });

  it(`Private route should be render loading when unknown`, async () => {
    render(
        <Provider store={mockStore(authUserInitialState)}>
          <Router history={history}>
            <Route
              exact
              path={`/login`}
            >
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path={`/private`}
              render={() => <h1>Private Route</h1>}
            />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    await expect(screen.queryByText(/Private Route/i)).toBeInTheDocument();
  });
});
