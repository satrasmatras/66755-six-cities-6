import Offer from "../../models/offer";
import Comment from "../../models/comment";
import {Dispatch} from "redux";
import {AxiosInstance} from "axios";
import {RootState} from "../index";
import {adaptDataToOffer} from "../../adapters/offers";
import {adaptDataToComment} from "../../adapters/comments";
import {CommentPost} from "../../models/comment-post";
import {createSlice} from "@reduxjs/toolkit";

interface OfferState {
  offer: Offer,
  comments: Comment[],
  offerIsLoading: false,
  commentsAreLoading: false,
}

const initialState: OfferState = {
  offer: null,
  comments: [],
  offerIsLoading: false,
  commentsAreLoading: false
};

const slice = createSlice({
  name: 'offer',
  initialState: initialState,
  reducers: {
    setOffer: (state, action) => {
      state.offer = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setOfferIsLoading: (state, action) => {
      state.offerIsLoading = action.payload;
    },
    setCommentsAreLoading: (state, action) => {
      state.commentsAreLoading = action.payload;
    },
  }
})

export const {
  setOffer,
  setComments,
  setCommentsAreLoading,
  setOfferIsLoading,
  addComment
} = slice.actions;

const getOfferRoute = (id: number) => `/hotels/${id}`;

export const loadOfferById = (id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setOfferIsLoading(true));
  const response = await api.get(getOfferRoute(id));
  const offer = response.data;
  dispatch(setOffer(adaptDataToOffer(offer)));
  dispatch(setOfferIsLoading(false));
}

const getCommentsRoute = (id: number) => `/comments/${id}`;

export const loadOfferComments = (id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setCommentsAreLoading(true));
  const response = await api.get(getCommentsRoute(id));
  const comments =
    response
      .data
      .map(adaptDataToComment);
  dispatch(setComments(comments));
  dispatch(setCommentsAreLoading(false));
}

export const postComment = (commentPost: CommentPost, id: number) => async (dispatch: Dispatch, _: RootState, api: AxiosInstance) => {
  dispatch(setCommentsAreLoading(true));
  const response = await api.post(getCommentsRoute(id), commentPost);
  const comments =     response
    .data
    .map(adaptDataToComment);
  dispatch(setComments(comments));
  dispatch(setCommentsAreLoading(false));
}

export default slice.reducer;
