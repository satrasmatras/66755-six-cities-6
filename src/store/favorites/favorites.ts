import Offer from "../../models/offer";
import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../store";
import {AxiosInstance} from "axios";
import {adaptDataToOffer} from "../../adapters/offers";
import {updateOffer} from "../offers/offers";
import {deleteItem} from "../../services/items";
import {setNearbyOffers, setOffer, updateNearbyOffer} from "../offer/offer";

interface FavoritesState {
  favorites: Offer[],
  isLoading: boolean,
}

export const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
};

export const SET_FAVORITES = `favorites/setFavorites`;
export const setFavorites = createAction<Offer[]>(SET_FAVORITES);

export const DELETE_FAVORITE = `favorites/deleteFavorite`;
export const deleteFavorite = createAction<Offer>(DELETE_FAVORITE);

export const SET_IS_LOADING = `favorites/setIsLoading`;
export const setIsLoading = createAction<boolean>(SET_IS_LOADING);

const favoritesReducer = createReducer(
    initialState,
    (builder) => {
      builder.addCase(setFavorites, (state, action) => {
        state.favorites = action.payload;
      });
      builder.addCase(deleteFavorite, (state, action) => {
        state.favorites = deleteItem(state.favorites, action.payload);
      });
      builder.addCase(setIsLoading, (state, action) => {
        state.isLoading = action.payload;
      });
    }
);

export enum ApiRoutes {
  FAVORITES= `/favorite`,
}

export const fetchFavorites = () => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  next(setIsLoading(true));
  const response = await api.get(ApiRoutes.FAVORITES);
  const favorites = response.data.map(adaptDataToOffer);
  next(setFavorites(favorites));
  next(setIsLoading(false));
};

export enum ToggleFavoriteTarget {
  MAIN,
  FAVORITES,
  OFFER,
  NEARBY
}

export const getFavoriteToggle = (id: number, value: number) => `/favorite/${id}/${value}`;

export const toggleFavorite = (offer: Offer, target: ToggleFavoriteTarget) => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  const response = await api.post(getFavoriteToggle(offer.id, Number(!offer.isFavorite)));
  const updated = adaptDataToOffer(response.data);
  switch (target) {
    case ToggleFavoriteTarget.FAVORITES:
      next(deleteFavorite(updated));
      break;
    case ToggleFavoriteTarget.MAIN:
      next(updateOffer(updated));
      break;
    case ToggleFavoriteTarget.OFFER:
      next(setOffer(updated));
      break;
    case ToggleFavoriteTarget.NEARBY:
      next(updateNearbyOffer(updated));
      break;
  }
};

export default favoritesReducer;
