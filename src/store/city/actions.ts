import {CHANGE_CITY, CityActionTypes} from "./types";
import City from "../../models/city";

export const changeCity = (newCity: City): CityActionTypes => {
  return {
    type: CHANGE_CITY,
    payload: newCity
  };
};
