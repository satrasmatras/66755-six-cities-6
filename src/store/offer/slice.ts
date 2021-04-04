import Offer from "../../models/offer";
import Comment from "../../models/comment";
import {Dispatch} from "redux";
import {AxiosInstance} from "axios";
import {RootState} from "../index";
import {adaptDataToOffer} from "../../adapters/offers";
import {adaptDataToComment} from "../../adapters/comments";
import {CommentPost} from "../../models/comment-post";
import {createAction, createReducer} from "@reduxjs/toolkit";

interface OfferState {
  offer: Offer,
  comments: Comment[],
  nearbyOffers: Offer[],
  nearbyOffersIsLoading: boolean,
  offerIsLoading: boolean,
  commentsAreLoading: boolean,
}

export const initialState: OfferState = {
  offer: null,
  comments: [],
  nearbyOffers: [],
  nearbyOffersIsLoading: false,
  offerIsLoading: false,
  commentsAreLoading: false
};

export const SET_OFFER = `offer/setOffer`;
export const setOffer = createAction<Offer>(SET_OFFER);

export const SET_COMMENTS = `offer/setComments`;
export const setComments = createAction<Comment[]>(SET_COMMENTS);

export const ADD_COMMENT = `offer/setComment`;
export const addComment = createAction<Comment>(ADD_COMMENT);

export const SET_OFFER_IS_LOADING = `offer/setOfferIsLoading`;
export const setOfferIsLoading = createAction<boolean>(SET_OFFER_IS_LOADING);

export const SET_COMMENTS_IS_LOADING = `offer/setCommentsAreLoading`;
export const setCommentsAreLoading = createAction<boolean>(SET_COMMENTS_IS_LOADING);

export const SET_NEARBY_OFFERS = `offers/setNearbyOffers`;
export const setNearbyOffers = createAction<Offer[]>(SET_NEARBY_OFFERS);

export const SET_NEARBY_OFFERS_ARE_LOADING = `offers/setNearbyOffersAreLoading`;
export const setNearbyOffersAreLoading = createAction<boolean>(SET_NEARBY_OFFERS_ARE_LOADING);

const offerReducer = createReducer(initialState, (builder) => {
  builder.addCase(setOffer, (state, action) => {
    state.offer = action.payload;
  });
  builder.addCase(setComments, (state, action) => {
    state.comments = action.payload;
  });
  builder.addCase(addComment, (state, action) => {
    state.comments.push(action.payload);
  });
  builder.addCase(setNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload;
  });
  builder.addCase(setNearbyOffersAreLoading, (state, action) => {
    state.nearbyOffersIsLoading = action.payload;
  });
  builder.addCase(setOfferIsLoading, (state, action) => {
    state.offerIsLoading = action.payload;
  });
  builder.addCase(setCommentsAreLoading, (state, action) => {
    state.commentsAreLoading = action.payload;
  });
});

export const getOfferRoute = (id: number) => `/hotels/${id}`;

export const loadOfferById = (id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setOfferIsLoading(true));
  const response = await api.get(getOfferRoute(id));
  const offer = response.data;
  dispatch(setOffer(adaptDataToOffer(offer)));
  dispatch(setOfferIsLoading(false));
};

export const getCommentsRoute = (id: number) => `/comments/${id}`;

export const loadOfferComments = (id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setCommentsAreLoading(true));
  const response = await api.get(getCommentsRoute(id));
  const comments =
    response
      .data
      .map(adaptDataToComment);
  dispatch(setComments(comments));
  dispatch(setCommentsAreLoading(false));
};

export const postComment = (commentPost: CommentPost, id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setCommentsAreLoading(true));
  const response = await api.post(getCommentsRoute(id), commentPost);
  const comments = response
    .data
    .map(adaptDataToComment);
  dispatch(setComments(comments));
  dispatch(setCommentsAreLoading(false));
};

export const getNearbyOffers = (offerId: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setNearbyOffersAreLoading(true));
  const response = await api.get(`/hotels/${offerId}/nearby`);
  const offers = response
    .data
    .map(adaptDataToOffer);
  dispatch(setNearbyOffers(offers));
  dispatch(setNearbyOffersAreLoading(false));
};

export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectNearbyOffersIsLoading = (state: RootState) => state.offer.nearbyOffersIsLoading;

export default offerReducer;
