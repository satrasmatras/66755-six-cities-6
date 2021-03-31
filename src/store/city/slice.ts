import {CITIES} from "../../mocks/cities";
import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";
import City from "../../models/city";

export interface CityState {
  city: City,
}

export const initialState: CityState = {
  city: CITIES[0],
};

export const CHANGE_CITY = `city/changeCity`;
export const changeCity = createAction<City>(CHANGE_CITY);

const cityReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, ((state, action) => {
    state.city = action.payload;
  }));
});

export default cityReducer;
