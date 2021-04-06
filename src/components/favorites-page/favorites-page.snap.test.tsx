import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as userInitialState} from "../../store/user/user";
import {initialState as favoritesInitialState} from "../../store/favorites/favorites";
import FavoritesPage from "./favorites-page";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);
const store = mockStore({
  user: userInitialState,
  favorites: favoritesInitialState,
});

it(`Should favorites page render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <FavoritesPage />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
