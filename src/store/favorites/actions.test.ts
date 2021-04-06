import {
  DELETE_FAVORITE,
  deleteFavorite,
  SET_FAVORITES,
  SET_IS_LOADING,
  setFavorites,
  setIsLoading
} from "./favorites";
import {MOCK_ADAPTED_OFFER, MOCK_ADAPTED_OFFERS} from "../../common-mock";

describe(`favorites actions test`, () => {
  it(`setFavorites is correct`, () => {
    expect(
        setFavorites(MOCK_ADAPTED_OFFERS)
    ).toStrictEqual(
        {
          type: SET_FAVORITES,
          payload: MOCK_ADAPTED_OFFERS
        }
    );
  });

  it(`deleteFavorite is correct`, () => {
    expect(
        deleteFavorite(MOCK_ADAPTED_OFFER)
    ).toStrictEqual(
        {
          type: DELETE_FAVORITE,
          payload: MOCK_ADAPTED_OFFER
        }
    );
  });

  it(`setIsLoading is correct`, () => {
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
