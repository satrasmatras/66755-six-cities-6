import cityReducer from './city';
import offersReducer from './offers';
import mapReducer from "./map";
import userReducer from "./user";
import offerReducer from './offer';
import thunk from 'redux-thunk';
import {createAPI} from "../services/api";
import {AuthorizationStatus, setAuthorizationStatus} from "./user/slice";
import {redirectMiddleware, redirectToRoute} from "./redirect/slice";
import {configureStore} from "@reduxjs/toolkit";
import Routes from "../routes";
import favoritesReducer from './favorites';

const onUnauthorized = () => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  store.dispatch(redirectToRoute(Routes.LOGIN));
};

const api = createAPI(
    onUnauthorized,
    () => store.dispatch(redirectToRoute(Routes.NOT_FOUND))
);

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    map: mapReducer,
    user: userReducer,
    offer: offerReducer,
    favorites: favoritesReducer,
  },
  middleware: [
    thunk.withExtraArgument(api),
    redirectMiddleware
  ]
});

export type RootState = ReturnType<typeof store.getState>;
