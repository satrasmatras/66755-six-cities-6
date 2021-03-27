import React, {ReactElement, useCallback} from "react";
import Offer from "../../models/offer";
import OfferCard from "../offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {updateHoveredOffer} from "../../store/map/slice";
import {useDispatch} from "react-redux";
import {toggleFavorite, ToggleFavoriteTarget} from "../../store/favorites/slice";

interface OffersListProps {
  offers: Offer[],
}

const OffersList = ({offers}: OffersListProps): ReactElement => {
  const dispatch = useDispatch();
  const handleHover = useCallback((offer) => dispatch(updateHoveredOffer(offer)), []);
  const handleBookmark = useCallback((offer) => dispatch(toggleFavorite(offer, ToggleFavoriteTarget.MAIN)), []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, i) => {
          return (
            <OfferCard
              cardType={OfferCardTypes.CITY}
              key={i}
              offer={offer}
              handleHover={handleHover}
              handleBookmark={handleBookmark}
            />
          );
        })
      }
    </div>
  );
};

export default OffersList;
