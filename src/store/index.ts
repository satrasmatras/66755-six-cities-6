import cityReducer from './city';
import offersReducer from './offers';
import mapReducer from "./map";
import {Action, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import axiosInstance from "../services/api";

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  map: mapReducer
});


export type RootState = ReturnType<typeof rootReducer>
export type MyExtraArg = undefined;
export type MyThunkResult<R> = ThunkAction<R, RootState, MyExtraArg, Action>;

export type MyThunkDispatch = ThunkDispatch<RootState, MyExtraArg, Action>;

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    )
);
