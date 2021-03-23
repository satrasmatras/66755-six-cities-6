import cityReducer from './city';
import offersReducer from './offers';
import mapReducer from "./map";
import userReducer from "./user";
import offerReducer from './offer';
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {createAPI} from "../services/api";
import {setAuthorizationStatus} from "./user/actions";
import {AuthorizationStatus} from "./user/types";
import {redirect} from "./redirect";

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  map: mapReducer,
  user: userReducer,
  offer: offerReducer,
});

const api = createAPI(
    () => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH))
);

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect),
    )
);
