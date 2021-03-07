import {MapActionTypes, MapState, UPDATE_HOVERED_OFFER} from "./types";

const initialState: MapState = {
  hoveredOffer: null
};

export const mapReducer = (state = initialState, action: MapActionTypes): MapState => {
  switch (action.type) {
    case UPDATE_HOVERED_OFFER:
      return {
        ...state,
        hoveredOffer: action.payload
      };
    default:
      return state;
  }
};
