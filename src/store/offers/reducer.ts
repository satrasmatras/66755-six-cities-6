import {OffersActionTypes, OffersState, SET_SORT_TYPE, UPDATE_OFFERS} from "./types";
import OFFERS from "../../mocks/offers";
import SortType from "../../models/sort-type";

const initialState: OffersState = {
  offers: OFFERS,
  sortType: SortType.POPULAR
};

export const offersReducer = (state = initialState, action: OffersActionTypes): OffersState => {
  switch (action.type) {
    case UPDATE_OFFERS:
      return {
        ...state,
        offers: [...action.payload]
      };
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      };
    default:
      return state;
  }
};
