import Offer from "../../models/offer";
import {OffersActionTypes, UPDATE_OFFERS} from "./types";

export const updateOffers = (newOffers: Offer[]): OffersActionTypes => {
  return {
    type: UPDATE_OFFERS,
    payload: newOffers
  };
};
