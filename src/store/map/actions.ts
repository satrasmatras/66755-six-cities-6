import Offer from "../../models/offer";
import {MapActionTypes, UPDATE_HOVERED_OFFER} from "./types";
import {Action, ActionCreator} from "redux";

export const updateHoveredOffer: ActionCreator<Action> = (offer: Offer): MapActionTypes => {
  return {
    type: UPDATE_HOVERED_OFFER,
    payload: offer
  };
};
