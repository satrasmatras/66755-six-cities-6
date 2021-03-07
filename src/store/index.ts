import cityReducer from './city';
import offersReducer from './offers';
import mapReducer from "./map";
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  map: mapReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    composeWithDevTools()
);
