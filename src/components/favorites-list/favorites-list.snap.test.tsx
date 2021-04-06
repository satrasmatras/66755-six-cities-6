import React from "react";
import {render} from "@testing-library/react";
import FavoritesList from "./favorites-list";
import {MOCK_ADAPTED_OFFERS, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {Provider} from "react-redux";

const mockStore = mockConfigureStore();

it(`Should favorites list render correctly`, () => {
  const {container} = render(
      <Provider store={mockStore(MOCK_INITIAL_STATE)}>
        <Router history={browserHistory}>
          <FavoritesList
            favoriteOffers={MOCK_ADAPTED_OFFERS}
            handleBookmark={jest.fn()}
          />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
