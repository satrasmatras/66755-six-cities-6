import {
  ADD_COMMENT,
  addComment,
  SET_COMMENTS, SET_COMMENTS_IS_LOADING,
  SET_OFFER, SET_OFFER_IS_LOADING, setComments, setCommentsAreLoading,
  setOffer, setOfferIsLoading
} from "./slice";
import {MOCK_ADAPTED_COMMENT, MOCK_ADAPTED_COMMENTS, MOCK_ADAPTED_OFFER} from "../../common-mock";

describe(`offer actions test`, () => {
  it(`setOffer is correct`, () => {
    expect(
        setOffer(MOCK_ADAPTED_OFFER)
    ).toStrictEqual(
        {
          type: SET_OFFER,
          payload: MOCK_ADAPTED_OFFER
        }
    );
  });

  it(`setComments is correct`, function () {
    expect(
        setComments(MOCK_ADAPTED_COMMENTS)
    ).toStrictEqual(
        {
          type: SET_COMMENTS,
          payload: MOCK_ADAPTED_COMMENTS
        }
    );
  });

  it(`addComment is correct`, function () {
    expect(
        addComment(MOCK_ADAPTED_COMMENT)
    ).toStrictEqual(
        {
          type: ADD_COMMENT,
          payload: MOCK_ADAPTED_COMMENT
        }
    );
  });

  it(`setOfferIsLoading is correct`, function () {
    expect(
        setOfferIsLoading(true)
    ).toStrictEqual(
        {
          type: SET_OFFER_IS_LOADING,
          payload: true
        }
    );
  });

  it(`setCommentsAreLoading is correct`, function () {
    expect(
        setCommentsAreLoading(true)
    ).toStrictEqual(
        {
          type: SET_COMMENTS_IS_LOADING,
          payload: true
        }
    );
  });
});
