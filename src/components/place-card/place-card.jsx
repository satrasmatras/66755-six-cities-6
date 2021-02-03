import React from 'react';
import PlacePropType from './model';
import {capitalize} from "../../utils";
import {WIDTH_BY_STAR} from "../../constant";

const PlaceCard = (props) => {
  const {
    title,
    preview_image,
    price,
    rating,
    type,
    is_premium,
    is_favorite
  } = props.place;

  return (
    <article className="cities__place-card place-card">
      {
        is_premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={preview_image}
            width="260"
            height="200"
            alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${is_favorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * WIDTH_BY_STAR}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PlacePropType.isRequired
};

export default PlaceCard;
