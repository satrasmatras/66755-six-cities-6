import Offer from "../../models/offer";
import SortType from "../../models/sort-type";

export const UPDATE_OFFERS = `offers/updateOffers`;
export const SET_SORT_TYPE = `offers/setSortType`;

export interface UpdateOffersAction {
  type: typeof UPDATE_OFFERS,
  payload: Offer[]
}

export interface SetSortType {
  type: typeof SET_SORT_TYPE,
  payload: SortType
}

export interface OffersState {
  offers: Offer[],
  sortType: SortType
}

export type OffersActionTypes = UpdateOffersAction | SetSortType;
