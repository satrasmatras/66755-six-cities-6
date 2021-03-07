import Offer from "../../models/offer";
import {MapActionTypes, UPDATE_HOVERED_OFFER} from "./types";

export const updateHoveredOffer = (offer: Offer): MapActionTypes => {
  return {
    type: UPDATE_HOVERED_OFFER,
    payload: offer
  };
};
