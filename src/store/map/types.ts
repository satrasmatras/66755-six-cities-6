import Offer from "../../models/offer";

export const UPDATE_HOVERED_OFFER = `map/updateHoveredOffer`;

export interface UpdateHoveredOfferAction {
  type: typeof UPDATE_HOVERED_OFFER,
  payload: Offer
}

export interface MapState {
  hoveredOffer: Offer
}

export type MapActionTypes = UpdateHoveredOfferAction;
