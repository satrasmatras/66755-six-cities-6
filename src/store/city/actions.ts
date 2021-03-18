import {CHANGE_CITY, CityActionTypes} from "./types";
import City from "../../models/city";
import {Action, ActionCreator} from "redux";

export const changeCity: ActionCreator<Action> = (newCity: City): CityActionTypes => {
  return {
    type: CHANGE_CITY,
    payload: newCity
  };
};
