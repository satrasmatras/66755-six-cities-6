import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import {Provider} from "react-redux";
import CreateCommentForm from "./create-comment-form";
import {MOCK_ADAPTED_OFFER, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";

const mockStore = mockConfigureStore();

it(`Should create comment form render correctly`, () => {
  const {container} = render(
      <Provider store={mockStore(MOCK_INITIAL_STATE)}>
        <Router history={browserHistory}>
          <CreateCommentForm offerId={MOCK_ADAPTED_OFFER.id}/>
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
