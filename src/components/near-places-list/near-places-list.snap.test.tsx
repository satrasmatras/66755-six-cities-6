import React from "react";
import {render} from "@testing-library/react";
import NearPlacesList from "./near-places-list";
import {MOCK_ADAPTED_OFFERS} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../services/browser-history";

it(`Should login render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <NearPlacesList offers={MOCK_ADAPTED_OFFERS} />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
