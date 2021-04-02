import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import NotFoundPage from "./not-found-page";
import {MOCK_INITIAL_STATE} from "../../common-mock";

const mockStore = configureStore([thunk]);
const store = mockStore(MOCK_INITIAL_STATE);

it(`Should NotFoundPage render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <NotFoundPage />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
