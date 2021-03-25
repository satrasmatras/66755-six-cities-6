import {createSelector} from "reselect";
import {RootState} from "../index";
import Offer from "../../models/offer";
import {sortOffersBySortType} from "../../selectors/offers";

const selectAllOffers = (state: RootState) => state.offers.offers;
const selectSortType = (state: RootState) => state.offers.sortType;
const selectCity = (state: RootState) => state.city.city;

export const selectOffersByCity = createSelector(
  [selectAllOffers, selectCity],
  (offers, city) => offers.filter((offer: Offer) => offer.city.name === city.name)
)

export const selectSortedOffers = createSelector(
  [selectOffersByCity, selectSortType],
  sortOffersBySortType
)
