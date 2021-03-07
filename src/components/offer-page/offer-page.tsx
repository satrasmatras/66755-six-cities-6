import React, {ReactElement, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Routes from "../../routes";
import {getOfferById} from "../../services/offers";
import Offer, {calculateRatingBarWidth} from "../../models/offer";
import {toCapitalize} from "../../utils";
import COMMENTS from "../../mocks/comments";
import CreateCommentForm from "../create-comment-form";
import Map from "../map";
import ReviewsList from "../reviews-list";
import NearPlacesList from "../near-places-list";

interface OfferPageParams {
  id: string
}

interface OfferPageProps {
  offers: Offer[],
}

const getNearbyOffers = (offers: Offer[], id: number) => {
  return offers.filter((o) => o.id !== id).slice(0, 3);
};

const OfferPage = ({offers}: OfferPageProps): ReactElement => {
  const {id} = useParams<OfferPageParams>();
  const [offer, setOffer] = useState<Offer>(null);
  const [nearbyOffers] = useState<Offer[]>(getNearbyOffers(offers, Number(id)));

  useEffect(() => {
    setOffer(getOfferById(Number(id)));
  }, [id]);

  if (!offer) {
    return (<div></div>);
  }

  return (
    <>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={Routes.MAIN}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  offer.images.map((image, i) => {
                    return (
                      <div className="property__image-wrapper" key={`image${i}`}>
                        <img className="property__image" src={image} alt="Photo studio"/>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  offer.isPremium && <div className="property__mark">
                    <span>Premium</span>
                  </div>
                }

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button className={`property__bookmark-button ${offer.isFavorite ? `property__bookmark-button--active` : ``} button`} type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${calculateRatingBarWidth(offer.rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {toCapitalize(offer.type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((good, i) => {
                      return (
                        <li className="property__inside-item" key={`good-${i}`}>
                          {toCapitalize(good)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${offer.host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                        alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {toCapitalize(offer.host.name)}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList comments={COMMENTS} />
                  <CreateCommentForm />
                </section>
              </div>
            </div>
            <Map
              offers={nearbyOffers}
              className={`property__map map`}
              city={offer.city}
              mainOffer={offer}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <NearPlacesList offers={nearbyOffers} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OfferPage;
