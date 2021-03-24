import React, {Dispatch, ReactElement} from "react";
import PropTypes from "prop-types";
import Offer from "../../models/offer";
import OfferCard from "../offer-card";
import OfferCardTypes from "../../models/offer-card-types";
import {connect} from "react-redux";
import {updateHoveredOffer} from "../../store/map/slice";

interface OffersListProps {
  offers: Offer[],
  updateHoveredOffer: Dispatch<any>
}

const OffersList = ({offers, updateHoveredOffer}: OffersListProps): ReactElement => {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, i) => {
          return (
            <OfferCard
              cardType={OfferCardTypes.CITY}
              key={i}
              offer={offer}
              handleHover={updateHoveredOffer}
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateHoveredOffer: (offer: Offer) => dispatch(updateHoveredOffer(offer))
});

export default connect(null, mapDispatchToProps)(OffersList);
