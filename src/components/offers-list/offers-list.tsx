import React, {ReactElement, useCallback} from "react";
import Offer from "../../models/offer";
import OfferCard from "../offer-card/offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {updateHoveredOffer} from "../../store/map/map";
import {useDispatch} from "react-redux";
import {toggleFavorite, ToggleFavoriteTarget} from "../../store/favorites/favorites";

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
              key={`offer-card-${i}`}
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
