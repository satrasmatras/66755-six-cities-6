import {createAPI} from "../../services/api";
import MockAdapter from "axios-mock-adapter";
import {
  MOCK_ADAPTED_COMMENT,
  MOCK_ADAPTED_COMMENTS,
  MOCK_ADAPTED_OFFER,
  MOCK_COMMENTS_FROM_API,
  MOCK_OFFER_FROM_API,
} from "../../common-mock";
import {
  getCommentsRoute,
  getOfferRoute,
  loadOfferById,
  loadOfferComments, postComment, SET_COMMENTS, SET_COMMENTS_IS_LOADING,
  SET_OFFER,
  SET_OFFER_IS_LOADING
} from "./slice";
import {CommentPost} from "../../models/comment-post";
import {adaptDataToComment} from "../../adapters/comments";
const api = createAPI(undefined, undefined);

describe(`offer async actions work correctly`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it(`should load offer correctly`, () => {
    const {id} = MOCK_ADAPTED_OFFER;
    const loadOfferLoader = loadOfferById(id);

    const loadOfferByIdUrl = getOfferRoute(id);

    apiMock
      .onGet(loadOfferByIdUrl)
      .reply(200, MOCK_OFFER_FROM_API);

    return loadOfferLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_OFFER_IS_LOADING,
          payload: true
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_OFFER,
          payload: MOCK_ADAPTED_OFFER
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_OFFER_IS_LOADING,
          payload: false
        });
      });
  });
  it(`should load comment by offer id correctly`, () => {
    const {id} = MOCK_ADAPTED_OFFER;
    const loadOfferCommentsLoader = loadOfferComments(id);

    const getCommentsByIdUrl = getCommentsRoute(id);

    apiMock
      .onGet(getCommentsByIdUrl)
      .reply(200, MOCK_COMMENTS_FROM_API);

    return loadOfferCommentsLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS_IS_LOADING,
          payload: true
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS,
          payload: MOCK_ADAPTED_COMMENTS
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS_IS_LOADING,
          payload: false
        });
      });
  });
  it(`should add comment correctly`, () => {
    const {id} = MOCK_ADAPTED_OFFER;

    const expectedId = MOCK_ADAPTED_COMMENTS.length;

    const newComment: CommentPost = {
      rating: MOCK_ADAPTED_COMMENT.rating,
      comment: MOCK_ADAPTED_COMMENT.comment,
    };

    const expectedCommentsFromApi = [
      ...MOCK_COMMENTS_FROM_API,
      {
        ...MOCK_ADAPTED_COMMENT,
        id: expectedId,
      }
    ];

    const expectedPayload = [
      ...MOCK_COMMENTS_FROM_API,
      {
        ...MOCK_ADAPTED_COMMENT,
        id: expectedId,
      }
    ].map(adaptDataToComment);

    const postCommentLoader = postComment(newComment, id);

    const getCommentsByIdUrl = getCommentsRoute(id);

    apiMock
      .onPost(getCommentsByIdUrl)
      .reply(200, expectedCommentsFromApi);

    return postCommentLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS_IS_LOADING,
          payload: true
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS,
          payload: expectedPayload
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_COMMENTS_IS_LOADING,
          payload: false
        });
      });
  });
});
