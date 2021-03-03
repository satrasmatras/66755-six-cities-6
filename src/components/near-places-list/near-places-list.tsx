import React, {ReactElement} from 'react';
import Offer from "../../models/offer";
import OfferCard from "../offer-card";
import OfferCardTypes from "../../models/offer-card-types";

interface NearPlacesListProps {
  offers: Offer[]
}

const NearPlacesList = ({offers}: NearPlacesListProps): ReactElement => {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer, i) => {
        return <OfferCard cardType={OfferCardTypes.NEAR} offer={offer} key={`near-card-${i}`} />;
      })}
    </div>
  );
};

export default NearPlacesList;
