import Offer from "../../models/offer";
import {OffersActionTypes, SET_LOADING, SET_SORT_TYPE, UPDATE_OFFERS} from "./types";
import SortType from "../../models/sort-type";
import {Action, ActionCreator} from "redux";

export const updateOffers: ActionCreator<Action> = (newOffers: Offer[]): OffersActionTypes => {
  return {
    type: UPDATE_OFFERS,
    payload: newOffers
  };
};

export const setSortType: ActionCreator<Action> = (newSortType: SortType): OffersActionTypes => {
  return {
    type: SET_SORT_TYPE,
    payload: newSortType
  };
};

export const setIsLoading: ActionCreator<Action> = (newLoading: boolean): OffersActionTypes => {
  return {
    type: SET_LOADING,
    payload: newLoading
  };
};
