import React, {ReactElement, useState} from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import OfferCard from "../offer-card";
import OfferCardTypes from "../../models/offer-card-types";

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
            <OfferCard
              cardType={OfferCardTypes.CITY}
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
