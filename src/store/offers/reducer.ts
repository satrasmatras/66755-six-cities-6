import {OffersActionTypes, OffersState, UPDATE_OFFERS} from "./types";

const initialState: OffersState = {
  offers: []
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
