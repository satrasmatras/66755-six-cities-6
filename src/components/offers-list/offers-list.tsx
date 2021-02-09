import React, {useState} from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import PlaceCard from "../place-card";

interface OffersListProps {
  offers: Offer[],
}

const OffersList = ({offers}: OffersListProps) => {
  const [activeOffer, setActiveOffer] = useState(undefined);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, i) => <PlaceCard key={i} offer={offer} handleHover={setActiveOffer} />)
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array,
};

export default OffersList;
