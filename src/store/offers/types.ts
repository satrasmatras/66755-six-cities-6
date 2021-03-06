import Offer from "../../models/offer";

export const UPDATE_OFFERS = `offers/updateOffers`;

export interface UpdateOffersAction {
  type: typeof UPDATE_OFFERS,
  payload: Offer[]
}

export interface OffersState {
  offers: Offer[]
}

export type OffersActionTypes = UpdateOffersAction;
