import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as userInitialState} from "../../store/user/user";
import thunk from "redux-thunk";
import Login from "./login";

const mockStore = configureStore([thunk]);
const store = mockStore({
  user: userInitialState,
});

it(`Should login renders correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Login />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
