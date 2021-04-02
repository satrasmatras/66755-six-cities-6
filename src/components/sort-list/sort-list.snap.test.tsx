import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as offersInitialState} from "../../store/offers/slice";
import thunk from "redux-thunk";
import SortList from "./sort-list";

const store = configureStore([thunk])({offers: offersInitialState});

it(`Should render sort list correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <SortList />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
