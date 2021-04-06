import React from "react";
import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom";
import {getOfferRoute} from "../../routes";
import {MOCK_ADAPTED_OFFER, MOCK_INITIAL_STATE} from "../../common-mock";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import OfferPage from "./offer-page";

describe(`Offer page`, () => {
  const history = createMemoryHistory();
  const mockFactory = configureStore([thunk]);

  const useSelectorMock = jest.spyOn(redux, `useSelector`);
  const useDispatchMock = jest.spyOn(redux, `useDispatch`);

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(jest.fn());
  });

  it(`Render 'OfferPage' when user navigate to '/offer/1' url`, async () => {
    history.push(getOfferRoute(MOCK_ADAPTED_OFFER.id));
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <OfferPage />
          </Router>
        </Provider>
    );

    await expect(screen.getByTestId(`offer-title`)).toBeInTheDocument();
  });
});
