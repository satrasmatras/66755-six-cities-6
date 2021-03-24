import {CITIES} from "../../mocks/cities";
import {createSlice} from "@reduxjs/toolkit";
import City from "../../models/city";

export interface CityState {
  city: City,
}

const initialState: CityState = {
  city: CITIES[0],
};

const citySlice = createSlice({
  name: `city`,
  initialState: initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    }
  }
});

export const {
  changeCity,
} = citySlice.actions;

export default citySlice.reducer;
