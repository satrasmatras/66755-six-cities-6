import Offer from "../../models/offer";
import {OffersActionTypes, SET_SORT_TYPE, UPDATE_OFFERS} from "./types";
import SortType from "../../models/sort-type";

export const updateOffers = (newOffers: Offer[]): OffersActionTypes => {
  return {
    type: UPDATE_OFFERS,
    payload: newOffers
  };
};

export const setSortType = (newSortType: SortType): OffersActionTypes => {
  return {
    type: SET_SORT_TYPE,
    payload: newSortType
  };
};
