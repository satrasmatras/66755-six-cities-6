import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../services/browser-history";
import CitiesList from "./cities-list";
import {Provider} from "react-redux";
import {initialState} from "../../store/city/slice";
import configureStore from "redux-mock-store";

const store = configureStore(undefined)({city: initialState});

it(`Should cities list render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <CitiesList />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});


