import React, {ReactElement} from 'react';
import Offer from "../../models/offer";
import OfferCard from "../offer-card/offer-card";
import OfferCardTypes from "../../models/offer-card-types";

interface NearPlacesListProps {
  offers: Offer[],
  handleBookmark: any,
}

const NearPlacesList = ({offers, handleBookmark}: NearPlacesListProps): ReactElement => {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer, i) => {
        return (
          <OfferCard
            cardType={OfferCardTypes.NEAR}
            offer={offer}
            key={`near-card-${i}`}
            handleBookmark={handleBookmark}
          />
        );
      })}
    </div>
  );
};

export default NearPlacesList;
