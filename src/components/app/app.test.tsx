import React from "react";
import {createMemoryHistory} from "history";
import App from './app';
import {render, screen} from "@testing-library/react";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom";
import Routes, {getOfferRoute} from "../../routes";
import {MOCK_ADAPTED_OFFER, MOCK_INITIAL_STATE} from "../../common-mock";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe(`Test routing`, () => {
  const history = createMemoryHistory();
  const mockFactory = configureStore([thunk]);

  const useSelectorMock = jest.spyOn(redux, `useSelector`);
  const useDispatchMock = jest.spyOn(redux, `useDispatch`);

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(jest.fn());
  });

  it(`Render 'MainPage' when user navigate to '/' url`, async () => {
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(`Cities`)).toBeInTheDocument();
  });

  it(`Render 'OfferPage' when user navigate to '/offer/1' url`, async () => {
    history.push(getOfferRoute(MOCK_ADAPTED_OFFER.id));
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    await expect(screen.getByTestId(`offer-title`)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, async () => {
    history.push(Routes.FAVORITES);
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(`Saved listing`)).toBeInTheDocument();
  });

  it(`Render 'Login' when user navigate to '/login' url`, async () => {
    history.push(Routes.LOGIN);
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    await expect(screen.getByTestId(`login-title`)).toBeInTheDocument();
  });

  it(`Render 'NotFound' when user navigate to '/not-found' url`, async () => {
    history.push(Routes.NOT_FOUND);
    render(
        <Provider store={mockFactory(MOCK_INITIAL_STATE)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    await expect(screen.queryByText(`Oops. Page Not Found`)).toBeInTheDocument();
  });
});
