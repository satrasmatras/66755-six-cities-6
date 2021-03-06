import City from "../../models/city";
import {
  CHANGE_CITY,
  CityActionTypes,
  CityState
} from "./types";

const initialState: CityState = {
  city: City.AMSTERDAM
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
