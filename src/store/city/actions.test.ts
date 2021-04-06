import {MOCK_CITY} from "../../common-mock";
import {CHANGE_CITY, changeCity} from "./city";

describe(`city actions test`, () => {
  it(`setOffer is correct`, () => {
    expect(
        changeCity(MOCK_CITY)
    ).toStrictEqual(
        {
          type: CHANGE_CITY,
          payload: MOCK_CITY
        }
    );
  });
});
