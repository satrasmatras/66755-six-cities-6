import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import browserHistory from "../../services/browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {initialState as userInitialState} from "../../store/user/slice";
import {initialState as favoritesInitialState} from "../../store/favorites/slice";
import FavoritesPage from "./favorites-page";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);
const store = mockStore({
  user: userInitialState,
  favorites: favoritesInitialState,
});

it(`Should cities list render correctly`, () => {
  const {container} = render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <FavoritesPage />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
