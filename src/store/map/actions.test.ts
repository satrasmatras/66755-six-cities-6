import {
  UPDATE_HOVERED_OFFER,
  updateHoveredOffer
} from "./map";
import {MOCK_ADAPTED_OFFER} from "../../common-mock";

describe(`map actions test`, () => {
  it(`updateHoveredOffer is correct`, () => {
    expect(
        updateHoveredOffer(MOCK_ADAPTED_OFFER)
    ).toStrictEqual(
        {
          type: UPDATE_HOVERED_OFFER,
          payload: MOCK_ADAPTED_OFFER
        }
    );
  });
});
