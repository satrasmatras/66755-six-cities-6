import cityReducer from './city';
import offersReducer from './offers';
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    composeWithDevTools()
);
