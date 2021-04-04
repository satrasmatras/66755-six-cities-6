import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import CreateCommentForm from "./create-comment-form";
import {MOCK_ADAPTED_OFFER} from "../../common-mock";

const store = configureStore(undefined)({});

it(`Should create comment form render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <CreateCommentForm offerId={MOCK_ADAPTED_OFFER.id}/>
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
