import React, {Dispatch, ReactElement, useCallback} from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import OfferCard from "../offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {updateHoveredOffer} from "../../store/map/slice";
import {useDispatch} from "react-redux";

interface OffersListProps {
  offers: Offer[],
}

const OffersList = ({offers}: OffersListProps): ReactElement => {
  const dispatch = useDispatch();
  const handleHover = useCallback((offer) => dispatch(updateHoveredOffer(offer)), []);

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
            />
          );
        })
      }
    </div>
  );
};

export default OffersList;
