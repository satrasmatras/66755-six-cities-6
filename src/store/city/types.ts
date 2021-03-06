import City from "../../models/city";

export const CHANGE_CITY = `city/changeCity`;

export interface ChangeCityAction {
  type: typeof CHANGE_CITY,
  payload: City
}

export interface CityState {
  city: City
}

export type CityActionTypes = ChangeCityAction;
