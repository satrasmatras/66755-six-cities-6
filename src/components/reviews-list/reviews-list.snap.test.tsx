import React from "react";
import {render} from "@testing-library/react";

import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {MOCK_ADAPTED_COMMENTS} from "../../common-mock";
import ReviewsList from "./reviews-list";

it(`Should reviews list render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <ReviewsList comments={MOCK_ADAPTED_COMMENTS} count={MOCK_ADAPTED_COMMENTS.length} />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
