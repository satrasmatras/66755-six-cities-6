import Offer from "../../models/offer";
import {createSlice} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../index";
import {AxiosInstance} from "axios";
import {adaptDataToOffer} from "../../adapters/offers";
import {updateOffers} from "../offers/slice";
import {deleteItem} from "../../services/items";
import {setOffer} from "../offer/slice";

interface FavoritesState {
  favorites: Offer[],
  isLoading: boolean,
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: `favorites`,
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    deleteFavorite: (state, action) => {
      state.favorites = deleteItem(state.favorites, action.payload);
    },
    setIsLoading: ((state, action) => {
      state.isLoading = action.payload;
    })
  }
});

export const {
  setFavorites,
  deleteFavorite,
  setIsLoading
} = favoritesSlice.actions;

enum ApiRoutes {
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
}

const getFavoriteToggle = (id: number, value: number) => `/favorite/${id}/${value}`;

export const toggleFavorite = (offer: Offer, target: ToggleFavoriteTarget) => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  const response = await api.post(getFavoriteToggle(offer.id, Number(!offer.isFavorite)));
  const updated = adaptDataToOffer(response.data);
  switch (target) {
    case ToggleFavoriteTarget.FAVORITES:
      next(deleteFavorite(updated));
      break;
    case ToggleFavoriteTarget.MAIN:
      next(updateOffers(updated));
      break;
    case ToggleFavoriteTarget.OFFER:
      next(setOffer(updated));
      break;
  }
};

export default favoritesSlice.reducer;
