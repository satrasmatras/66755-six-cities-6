import React, {Dispatch, ReactElement} from 'react';
import PropTypes from 'prop-types';
import Offer from "../../models/offer";
import {toCapitalize} from "../../utils";

const WIDTH_PER_STAR = 20;

interface PlaceCardProps {
  offer: Offer,
  handleHover: Dispatch<any>
}

const PlaceCard = ({offer, handleHover}: PlaceCardProps): ReactElement => {

  const {
    isPremium,
    isFavorite,
    previewImage,
    price,
    title,
    type,
    rating
  } = offer;

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => handleHover(offer)}>
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
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
            <span style={{width: `${(WIDTH_PER_STAR * Math.round(rating))}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{toCapitalize(type)}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.object,
};

export default PlaceCard;
