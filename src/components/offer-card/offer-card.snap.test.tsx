import React from "react";
import {render} from "@testing-library/react";
import OfferCard from "./offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {MOCK_ADAPTED_OFFER} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";

it(`Should main card render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <OfferCard
          cardType={OfferCardTypes.CITY}
          key={1}
          offer={MOCK_ADAPTED_OFFER}
          handleHover={jest.fn()}
          handleBookmark={jest.fn()}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});

it(`Should favorite render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <OfferCard
          cardType={OfferCardTypes.FAVORITE}
          key={1}
          offer={MOCK_ADAPTED_OFFER}
          handleHover={jest.fn()}
          handleBookmark={jest.fn()}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});

it(`Should nearby render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <OfferCard
          cardType={OfferCardTypes.NEAR}
          key={1}
          offer={MOCK_ADAPTED_OFFER}
          handleHover={jest.fn()}
          handleBookmark={jest.fn()}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
