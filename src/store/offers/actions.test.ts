import {
  SET_IS_LOADING,
  SET_OFFERS,
  SET_SORT_TYPE,
  setIsLoading,
  setOffers,
  setSortType,
  UPDATE_OFFER,
  updateOffer
} from "./slice";
import {MOCK_ADAPTED_OFFER, MOCK_ADAPTED_OFFERS, MOCK_SORT_TYPE} from "../../common-mock";

describe(`setOffers actions test`, () => {
  it(`setOffers is correct`, () => {
    expect(
        setOffers(MOCK_ADAPTED_OFFERS)
    ).toStrictEqual(
        {
          type: SET_OFFERS,
          payload: MOCK_ADAPTED_OFFERS
        }
    );
  });

  it(`updateOffer is correct`, function () {
    expect(
        updateOffer(MOCK_ADAPTED_OFFER)
    ).toStrictEqual(
        {
          type: UPDATE_OFFER,
          payload: MOCK_ADAPTED_OFFER
        }
    );
  });

  it(`setSortType is correct`, function () {
    expect(
        setSortType(MOCK_SORT_TYPE)
    ).toStrictEqual(
        {
          type: SET_SORT_TYPE,
          payload: MOCK_SORT_TYPE
        }
    );
  });

  it(`setOfferIsLoading is correct`, function () {
    expect(
        setIsLoading(true)
    ).toStrictEqual(
        {
          type: SET_IS_LOADING,
          payload: true
        }
    );
  });
});
