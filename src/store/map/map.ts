import {createAction, createReducer} from "@reduxjs/toolkit";
import Offer from "../../models/offer";

export interface MapState {
  hoveredOffer: Offer
}

export const initialState: MapState = {
  hoveredOffer: null
};

export const UPDATE_HOVERED_OFFER = `map/updateHoveredOffer`;
export const updateHoveredOffer = createAction<Offer>(UPDATE_HOVERED_OFFER);

const mapReducer = createReducer(
    initialState,
    (builder) => {
      builder.addCase(updateHoveredOffer, ((state, action) => {
        state.hoveredOffer = action.payload;
      }));
    }
);

export default mapReducer;
