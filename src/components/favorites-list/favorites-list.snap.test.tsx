import React from "react";
import {render} from "@testing-library/react";
import FavoritesList from "./favorites-list";
import {MOCK_ADAPTED_OFFERS} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";

it(`Should favorites list render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <FavoritesList
          favoriteOffers={MOCK_ADAPTED_OFFERS}
          handleBookmark={jest.fn()}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
