import Offer from "../../models/offer";
import Comment from "../../models/comment";
import {ActionCreator, Dispatch} from "redux";
import {AxiosInstance} from "axios";
import {RootState} from "../index";
import {adaptDataToOffer} from "../../adapters/offers";
import {adaptDataToComment} from "../../adapters/comments";
import {CommentPost} from "../../models/comment-post";

const SET_OFFER = `offer/setOffer`;
const SET_COMMENTS = `offer/setComments`;
const ADD_COMMENT = `offer/addComment`;
const SET_OFFER_IS_LOADING = `offer/setOfferIsLoading`;
const SET_COMMENTS_ARE_LOADING = `offer/setCommentsAreLoading`;

interface SetOffer {
  type: typeof SET_OFFER,
  payload: Offer,
}

const setOffer: ActionCreator<SetOffer> = (offer: Offer) => ({
  type: SET_OFFER,
  payload: offer,
});

interface SetComments {
  type: typeof SET_COMMENTS,
  payload: Comment[],
}

const setComments: ActionCreator<SetComments> = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  payload: comments,
});

interface AddComment {
  type: typeof ADD_COMMENT,
  payload: Comment,
}

const addComment: ActionCreator<AddComment> = (comment: Comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

interface SetOfferIsLoading {
  type: typeof SET_OFFER_IS_LOADING,
  payload: boolean,
}

const setOfferIsLoading: ActionCreator<SetOfferIsLoading> = (status: boolean) => ({
  type: SET_OFFER_IS_LOADING,
  payload: status,
});

interface SetCommentsAreLoading {
  type: typeof SET_COMMENTS_ARE_LOADING,
  payload: boolean,
}

const setCommentsAreLoading: ActionCreator<SetCommentsAreLoading> = (status: boolean) => ({
  type: SET_COMMENTS_ARE_LOADING,
  payload: status,
});

export type OfferActions = SetOffer | SetComments | SetOfferIsLoading | SetCommentsAreLoading | AddComment;

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

const offerReducer = (state: OfferState = initialState, action: OfferActions) => {
  switch (action.type) {
    case SET_OFFER:
      return {
        ...state,
        offer: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case SET_OFFER_IS_LOADING:
      return {
        ...state,
        offerIsLoading: action.payload
      };
    case SET_COMMENTS_ARE_LOADING:
      return {
        ...state,
        commentsAreLoading: action.payload
      };
    default:
      return state;
  }
}

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

export default offerReducer;
