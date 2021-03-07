import {
  CHANGE_CITY,
  CityActionTypes,
  CityState
} from "./types";
import {CITIES} from "../../mocks/cities";

const initialState: CityState = {
  city: CITIES[0],
};

export const cityReducer = (state = initialState, action: CityActionTypes): CityState => {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    default:
      return state;
  }
};
