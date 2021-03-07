import {OffersActionTypes, OffersState, UPDATE_OFFERS} from "./types";
import OFFERS from "../../mocks/offers";

const initialState: OffersState = {
  offers: OFFERS
};

export const offersReducer = (state = initialState, action: OffersActionTypes): OffersState => {
  switch (action.type) {
    case UPDATE_OFFERS:
      return {
        ...state,
        offers: [...action.payload]
      };
    default:
      return state;
  }
};
