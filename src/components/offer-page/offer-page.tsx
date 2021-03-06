import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {calculateRatingBarWidth} from "../../models/offer";
import {toCapitalize} from "../../utils";
import CreateCommentForm from "../create-comment-form/create-comment-form";
import Map from "../map/map";
import ReviewsList from "../reviews-list/reviews-list";
import NearPlacesList from "../near-places-list/near-places-list";
import {
  getNearbyOffers,
  loadOfferById,
  loadOfferComments,
  selectNearbyOffers,
  selectNearbyOffersIsLoading
} from "../../store/offer/offer";
import Loader from "../loader/loader";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {selectIsAuthorized} from "../../selectors/user";
import {toggleFavorite, ToggleFavoriteTarget} from "../../store/favorites/favorites";
import {selectCommentsCount, selectLastComments} from "../../selectors/comments";
import {redirectToRoute} from "../../store/redirect/redirect";
import Routes from "../../routes";

interface OfferPageParams {
  id: string
}

const OfferPage = (): ReactElement => {
  const {
    offer,
    offerIsLoading,
    commentsAreLoading,
  } = useSelector((state: RootState) => state.offer);
  const comments = useSelector(selectLastComments);
  const commentsCount = useSelector(selectCommentsCount);
  const isAuthorized = useSelector(selectIsAuthorized);
  const dispatch = useDispatch();
  const handleBookmark = useCallback((offer) => dispatch(toggleFavorite(offer, ToggleFavoriteTarget.OFFER)), []);
  const handleBookmarkNearby = useCallback((offer) => dispatch(toggleFavorite(offer, ToggleFavoriteTarget.NEARBY)), []);

  const {id} = useParams<OfferPageParams>();
  const nearbyOffers = useSelector(selectNearbyOffers);
  const nearbyOffersIsLoading = useSelector(selectNearbyOffersIsLoading);

  const handleClick = () => {
    if (isAuthorized) {
      handleBookmark(offer);
    } else {
      dispatch(redirectToRoute(Routes.LOGIN));
    }
  };

  useEffect(() => {
    dispatch(loadOfferById(Number(id)));
    dispatch(loadOfferComments(Number(id)));
    dispatch(getNearbyOffers(Number(id)));
  }, [id]);

  if (offerIsLoading || !offer) {
    return (<Loader />);
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
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  offer?.images?.map((image, i) => {
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
                  offer?.isPremium && <div className="property__mark">
                    <span>Premium</span>
                  </div>
                }

                <div className="property__name-wrapper">
                  <h1
                    className="property__name"
                    data-testid="offer-title"
                  >
                    {offer.title}
                  </h1>
                  <button
                    className={`property__bookmark-button ${offer?.isFavorite ? `property__bookmark-button--active` : ``} button`}
                    type="button"
                    onClick={handleClick}
                  >
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
                  {
                    commentsAreLoading && <Loader />
                  }
                  {
                    !commentsAreLoading && <ReviewsList comments={comments} count={commentsCount}/>
                  }

                  {
                    isAuthorized && <CreateCommentForm offerId={offer.id}/>
                  }
                  {
                    !isAuthorized && <p>You need to login, if you want to leave comment about offer.</p>
                  }
                </section>
              </div>
            </div>
            {
              nearbyOffersIsLoading ?
                <Loader /> :
                <Map
                  offers={nearbyOffers}
                  className={`property__map map`}
                  city={offer.city}
                  mainOffer={offer}
                />
            }
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <NearPlacesList offers={nearbyOffers} handleBookmark={handleBookmarkNearby} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OfferPage;
