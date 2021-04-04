import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as userInitialState} from "../../store/user/slice";
import thunk from "redux-thunk";
import {initialState as offersInitialState} from "../../store/offers/slice";
import Header from "../header/header";

const mockStore = configureStore([thunk]);
const store = mockStore({
  user: userInitialState,
  offers: offersInitialState
});

it(`Should main page render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Header />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
