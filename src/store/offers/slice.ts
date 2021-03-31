import SortType from "../../models/sort-type";
import Offer from "../../models/offer";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../index";
import {AxiosInstance} from "axios";
import {adaptDataToOffer} from "../../adapters/offers";
import {updateItem} from "../../services/items";

export interface OffersState {
  offers: Offer[],
  sortType: SortType,
  isLoading: boolean,
}

export const initialState: OffersState = {
  offers: [],
  sortType: SortType.POPULAR,
  isLoading: false,
};

export const SET_OFFERS = `offers/setOffers`;
export const setOffers = createAction<Offer[]>(SET_OFFERS);

export const UPDATE_OFFER = `offers/updateOffers`;
export const updateOffer = createAction<Offer>(UPDATE_OFFER);

export const SET_SORT_TYPE = `offers/setSortType`;
export const setSortType = createAction<SortType>(SET_SORT_TYPE);

export const SET_IS_LOADING = `offers/setIsLoading`;
export const setIsLoading = createAction<boolean>(SET_IS_LOADING);

const offersReducer = createReducer(
    initialState,
    (builder) => {
      builder.addCase(setOffers, (state, action) => {
        state.offers = action.payload;
      });
      builder.addCase(updateOffer, (state, action) => {
        state.offers = updateItem(state.offers, action.payload);
      });
      builder.addCase(setSortType, (state, action) => {
        state.sortType = action.payload;
      });
      builder.addCase(setIsLoading, (state, action) => {
        state.isLoading = action.payload;
      });
    }
);

export enum ApiRoutes {
  FETCH_OFFERS = `hotels`,
}

export const fetchOffers = () => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  next(setIsLoading(true));
  const response = await api.get(ApiRoutes.FETCH_OFFERS);
  const offers = response.data;
  next(setOffers(offers.map(adaptDataToOffer)));
  next(setIsLoading(false));

};

export default offersReducer;
