import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import OffersList from "./offers-list";
import {MOCK_ADAPTED_OFFERS} from "../../common-mock";

const mockStore = configureStore([thunk]);
const store = mockStore();

it(`Should cities list render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <OffersList offers={MOCK_ADAPTED_OFFERS}/>
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
