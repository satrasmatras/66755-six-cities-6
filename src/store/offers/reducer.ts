import {OffersActionTypes, OffersState, SET_LOADING, SET_SORT_TYPE, UPDATE_OFFERS} from "./types";
import SortType from "../../models/sort-type";

const initialState: OffersState = {
  offers: [],
  sortType: SortType.POPULAR,
  isLoading: false,
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
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};
