import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as userInitialState} from "../../store/user/user";
import thunk from "redux-thunk";
import {initialState as offersInitialState} from "../../store/offers/offers";
import Map from "./map";
import {MOCK_ADAPTED_OFFER, MOCK_ADAPTED_OFFERS, MOCK_CITY} from "../../common-mock";

const mockStore = configureStore([thunk]);
const store = mockStore({
  user: userInitialState,
  offers: offersInitialState
});

it(`Should map render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Map
            mainOffer={MOCK_ADAPTED_OFFER}
            offers={MOCK_ADAPTED_OFFERS}
            city={MOCK_CITY}
            className={`map cities__map`}
          />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
