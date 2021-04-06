import cityReducer from './city/city';
import offersReducer from './offers/offers';
import mapReducer from "./map/map";
import userReducer from "./user/user";
import offerReducer from './offer/offer';
import thunk from 'redux-thunk';
import {createAPI} from "../services/api";
import {AuthorizationStatus, setAuthorizationStatus} from "./user/user";
import {redirectMiddleware, redirectToRoute} from "./redirect/redirect";
import {configureStore} from "@reduxjs/toolkit";
import Routes from "../routes";
import favoritesReducer from './favorites/favorites';
import browserHistory from "../browser-history";

const onUnauthorized = () => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
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
    redirectMiddleware(browserHistory)
  ]
});

export type RootState = ReturnType<typeof store.getState>;
