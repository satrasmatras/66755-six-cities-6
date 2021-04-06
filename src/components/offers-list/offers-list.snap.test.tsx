import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {Provider} from "react-redux";
import OffersList from "./offers-list";
import {MOCK_ADAPTED_OFFERS, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";

const mockStore = mockConfigureStore();

it(`Should offers list render correctly`, () => {
  const {container} = render(
      <Provider store={mockStore(MOCK_INITIAL_STATE)}>
        <Router history={browserHistory}>
          <OffersList offers={MOCK_ADAPTED_OFFERS}/>
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
