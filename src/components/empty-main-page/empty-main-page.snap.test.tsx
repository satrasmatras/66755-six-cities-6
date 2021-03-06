import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import EmptyMainPage from "./empty-main-page";
import {initialState} from "../../store/user/user";

const store = configureStore(undefined)({user: initialState});

it(`Should empty main page render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <EmptyMainPage />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
