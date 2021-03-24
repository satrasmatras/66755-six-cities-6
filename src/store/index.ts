import cityReducer from './city';
import offersReducer from './offers';
import mapReducer from "./map";
import userReducer from "./user";
import offerReducer from './offer';
import thunk from 'redux-thunk';
import {createAPI} from "../services/api";
import {AuthorizationStatus, setAuthorizationStatus} from "./user/slice";
import redirectReducer, {redirectMiddleware} from "./redirect/slice";
import {configureStore} from "@reduxjs/toolkit";

const api = createAPI(
  () => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH))
);

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    map: mapReducer,
    user: userReducer,
    offer: offerReducer,
    redirect: redirectReducer,
  },
  middleware: [
    thunk.withExtraArgument(api),
    redirectMiddleware
  ]
});

export type RootState = ReturnType<typeof store.getState>
