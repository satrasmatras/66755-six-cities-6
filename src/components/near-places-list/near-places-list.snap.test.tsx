import React from "react";
import {render} from "@testing-library/react";
import NearPlacesList from "./near-places-list";
import {MOCK_ADAPTED_OFFERS, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {Provider} from "react-redux";

const mockStore = mockConfigureStore();

it(`Should near places render correctly`, () => {
  const {container} = render(
      <Provider store={mockStore(MOCK_INITIAL_STATE)}>
        <Router history={browserHistory}>
          <NearPlacesList offers={MOCK_ADAPTED_OFFERS} handleBookmark={jest.fn()}/>
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
