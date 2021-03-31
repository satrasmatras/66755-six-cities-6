import React from "react";
import configureStore from "redux-mock-store";
import {createMemoryHistory} from "history";
import App from './app';
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom";
import {
  MOCK_ADAPTED_AUTH_INFO, MOCK_ADAPTED_COMMENTS,
  MOCK_ADAPTED_OFFER,
  MOCK_ADAPTED_OFFERS,
  MOCK_AUTHORIZATION_STATUS,
  MOCK_CITY,
  MOCK_SORT_TYPE
} from "../../common-mock";
import thunk from "redux-thunk";
import {RootState} from "../../store";
import Routes, {getOfferRoute} from "../../routes";
import {AuthorizationStatus} from "../../store/user/slice";

const mockStore = configureStore([thunk]);

describe(`Test routing`, () => {
  const initialState: RootState = {
    offers: {
      offers: MOCK_ADAPTED_OFFERS,
      isLoading: false,
      sortType: MOCK_SORT_TYPE
    },
    city: {
      city: MOCK_CITY
    },
    map: {
      hoveredOffer: MOCK_ADAPTED_OFFER
    },
    user: {
      authorizationStatus: MOCK_AUTHORIZATION_STATUS,
      authInfo: MOCK_ADAPTED_AUTH_INFO
    },
    offer: {
      offer: MOCK_ADAPTED_OFFER,
      offerIsLoading: false,
      comments: MOCK_ADAPTED_COMMENTS,
      commentsAreLoading: false
    },
    favorites: {
      favorites: MOCK_ADAPTED_OFFERS,
      isLoading: false
    }
  };

  const store = mockStore(initialState);

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
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
    const history = createMemoryHistory();
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
    const history = createMemoryHistory();
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
    const history = createMemoryHistory();
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
    const history = createMemoryHistory();
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
