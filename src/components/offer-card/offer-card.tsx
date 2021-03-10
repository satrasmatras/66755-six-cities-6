import React, {Dispatch, ReactElement, SyntheticEvent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Offer, {calculateRatingBarWidth} from "../../models/offer";
import OfferCardTypes from "../../models/offer-card-types";
import {toCapitalize} from "../../utils";
import {getOfferRoute} from "../../routes";

interface OfferCardProps {
  cardType: OfferCardTypes,
  offer: Offer,
  handleHover?: Dispatch<any>
}

const OfferCard = ({cardType, offer, handleHover = null}: OfferCardProps): ReactElement => {
  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    price,
    title,
    type,
    rating
  } = offer;

  let articleClass = ``;
  let imageWrapperClass = ``;
  let cardInfoClass = ``;
  let previewImageWidth;
  let previewImageHeight;

  const offerRoute = getOfferRoute(id);

  switch (cardType) {
    case OfferCardTypes.FAVORITE:
    {
      articleClass = `favorites__card`;
      imageWrapperClass = `favorites__image-wrapper`;
      cardInfoClass = `favorites__card-info`;
      previewImageWidth = 150;
      previewImageHeight = 110;
      break;
    }
    case OfferCardTypes.NEAR:
    {
      articleClass = `near-places__card`;
      imageWrapperClass = `near-places__image-wrapper`;
      break;
    }
    default: {
      articleClass = `cities__place-card`;
      imageWrapperClass = `cities__image-wrapper`;
      previewImageWidth = 260;
      previewImageHeight = 200;
      break;
    }
  }

  const handleMouseMove = (event: SyntheticEvent) => {
    if (handleHover) {
      handleHover(offer);
    }
  };

  const handleMouseLeave = (event: SyntheticEvent) => {
    if (handleHover) {
      handleHover(null);
    }
  };

  return (
    <article
      className={`${articleClass} place-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={offerRoute}>
          <img
            className="place-card__image"
            src={previewImage}
            width={previewImageWidth}
            height={previewImageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRatingBarWidth(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{toCapitalize(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.object,
};

export default OfferCard;
