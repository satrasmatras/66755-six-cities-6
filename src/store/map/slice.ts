import {createSlice} from "@reduxjs/toolkit";
import Offer from "../../models/offer";

export interface MapState {
  hoveredOffer: Offer
}

const initialState: MapState = {
  hoveredOffer: null
};

const mapSlice = createSlice({
  name: `map`,
  initialState: initialState,
  reducers: {
    updateHoveredOffer: (state, action) => {
      state.hoveredOffer = action.payload;
    }
  }
})

export const {
  updateHoveredOffer
} = mapSlice.actions;

export default mapSlice.reducer;
