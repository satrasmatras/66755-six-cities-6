import Offer from "../models/offer";
import SortType from "../models/sort-type";

export const getOffersByCity = (offers: Offer[], city: string): Offer[] => {
  return offers.filter((offer) => {
    return offer.city.name === city;
  });
};

const sortOffersByPriceAsc = (o1: Offer, o2: Offer) => o1.price - o2.price;
const sortOffersByPriceDesc = (o1: Offer, o2: Offer) => o2.price - o1.price;
const sortOffersByRatingDesc = (o1: Offer, o2: Offer) => o2.rating - o1.rating;

export const sortOffersBySortType = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PRICE_DESC:
      return [...offers].sort(sortOffersByPriceDesc);
    case SortType.PRICE_ASC:
      return [...offers].sort(sortOffersByPriceAsc);
    case SortType.TOP_RATED:
      return [...offers].sort(sortOffersByRatingDesc);
    default:
      return offers;
  }
};
