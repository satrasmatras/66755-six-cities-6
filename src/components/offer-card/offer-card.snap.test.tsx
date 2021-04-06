import React from "react";
import {render} from "@testing-library/react";
import OfferCard from "./offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {MOCK_ADAPTED_OFFER, MOCK_INITIAL_STATE, mockConfigureStore} from "../../common-mock";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe(`offer card should render correctly`, () => {
  const mockFactory = configureStore([thunk]);

  const useSelectorMock = jest.spyOn(redux, `useSelector`);
  const useDispatchMock = jest.spyOn(redux, `useDispatch`);

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(jest.fn());
  });

  it(`Should main card render correctly`, () => {
    const {container} = render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={browserHistory}>
            <OfferCard
              cardType={OfferCardTypes.CITY}
              key={1}
              offer={MOCK_ADAPTED_OFFER}
              handleHover={jest.fn()}
              handleBookmark={jest.fn()}
            />
          </Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it(`Should favorite render correctly`, () => {
    const {container} = render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={browserHistory}>
            <OfferCard
              cardType={OfferCardTypes.FAVORITE}
              key={1}
              offer={MOCK_ADAPTED_OFFER}
              handleHover={jest.fn()}
              handleBookmark={jest.fn()}
            />
          </Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it(`Should nearby render correctly`, () => {
    const {container} = render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={browserHistory}>
            <OfferCard
              cardType={OfferCardTypes.NEAR}
              key={1}
              offer={MOCK_ADAPTED_OFFER}
              handleHover={jest.fn()}
              handleBookmark={jest.fn()}
            />
          </Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
