import React, {ReactElement, useState} from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import PlaceCard from "../place-card";
import PlaceCardTypes from "../../models/placeCardTypes";

interface OffersListProps {
  offers: Offer[],
}

const OffersList = ({offers}: OffersListProps): ReactElement => {
  const [, setActiveOffer] = useState(undefined);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, i) => {
          return (
            <PlaceCard
              cardType={PlaceCardTypes.CITY}
              key={i}
              offer={offer}
              handleHover={setActiveOffer}
            />
          );
        })
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array,
};

export default OffersList;
