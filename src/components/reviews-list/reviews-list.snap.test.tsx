import React from "react";
import {render} from "@testing-library/react";

import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {MOCK_ADAPTED_COMMENTS} from "../../common-mock";
import ReviewsList from "./reviews-list";

it(`Should main card render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <ReviewsList comments={MOCK_ADAPTED_COMMENTS}/>
      </Router>
  );
  expect(container).toMatchSnapshot();
});

