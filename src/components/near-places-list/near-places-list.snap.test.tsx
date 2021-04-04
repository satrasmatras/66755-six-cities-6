import React from "react";
import {render} from "@testing-library/react";
import NearPlacesList from "./near-places-list";
import {MOCK_ADAPTED_OFFERS} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";

it(`Should near places render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <NearPlacesList offers={MOCK_ADAPTED_OFFERS} />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
