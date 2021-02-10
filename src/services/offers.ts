import Offer from "../models/offer";
import OFFERS from "../mocks/offers";

export const getOfferById = (id: number): Offer => {
  return OFFERS.find((offer) => offer.id === id);
};
