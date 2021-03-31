import React from "react";
import {createMemoryHistory} from "history";
import App from './app';
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom";
import Routes, {getOfferRoute} from "../../routes";
import {MOCK_STORE, MOCK_ADAPTED_OFFER} from "../../common-mock";

describe(`Test routing`, () => {
  let store = MOCK_STORE;
  let history = createMemoryHistory();

  beforeEach(() => {
    store = MOCK_STORE;
    history = createMemoryHistory();
  });

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Cities`)).toBeInTheDocument();
  });

  it(`Render 'OfferPage' when user navigate to '/offer/1' url`, () => {
    history.push(getOfferRoute(MOCK_ADAPTED_OFFER.id));
    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(MOCK_ADAPTED_OFFER.title)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, () => {
    history.push(Routes.FAVORITES);
    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
  });

  it(`Render 'Login' when user navigate to '/login' url`, () => {
    history.push(Routes.LOGIN);
    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`login-title`)).toBeInTheDocument();
  });

  it(`Render 'NotFound' when user navigate to '/not-found' url`, () => {
    history.push(Routes.NOT_FOUND);
    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Oops. Page Not Found`)).toBeInTheDocument();
  });
});
