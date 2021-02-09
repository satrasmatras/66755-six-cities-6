import React from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import PlaceCard from "../place-card";

interface OffersListProps {
  offers: Offer[],
}

const OffersList = ({offers}: OffersListProps) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, i) => <PlaceCard key={i} offer={offer} />)
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array,
};

export default OffersList;
