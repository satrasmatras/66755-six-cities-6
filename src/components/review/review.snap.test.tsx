import React from "react";
import {render} from "@testing-library/react";

import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import Review from "./review";
import {MOCK_ADAPTED_COMMENT} from "../../common-mock";

it(`Should review render correctly`, () => {
  const {container} = render(
      <Router history={browserHistory}>
        <Review comment={MOCK_ADAPTED_COMMENT}/>
      </Router>
  );
  expect(container).toMatchSnapshot();
});

