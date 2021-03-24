import SortType from "../../models/sort-type";
import Offer from "../../models/offer";
import {createSlice} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../index";
import {AxiosInstance} from "axios";
import {adaptDataToOffer} from "../../adapters/offers";

export interface OffersState {
  offers: Offer[],
  sortType: SortType,
  isLoading: boolean,
}

const initialState: OffersState = {
  offers: [],
  sortType: SortType.POPULAR,
  isLoading: false,
};

const offersSlice = createSlice({
  name: `offers`,
  initialState,
  reducers: {
    updateOffers: (state, action) => {
      state.offers = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
})

export const {
  updateOffers,
  setSortType,
  setIsLoading,
} = offersSlice.actions;

enum ApiRoutes {
  FETCH_OFFERS = `hotels`,
}

export const fetchOffers = () => (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): void => {
  next(setIsLoading(true));
  api.get(ApiRoutes.FETCH_OFFERS)
    .then(({data}) => {
      next(updateOffers(data.map(adaptDataToOffer)));
      next(setIsLoading(false));
    });
};

export default offersSlice.reducer;
