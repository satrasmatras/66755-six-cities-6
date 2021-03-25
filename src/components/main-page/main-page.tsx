import React, {ReactElement, useEffect} from 'react';
import PropTypes from 'prop-types';
import Offer from "../../models/offer";
import OffersList from "../offers-list";
import Map from "../map";
import CitiesList from "../cities-list";
import {RootState} from "../../store";
import {connect} from "react-redux";
import City from "../../models/city";
import SortList from "../sort-list";
import {getOffersByCity, sortOffersBySortType} from "../../selectors/offers";
import {fetchOffers} from "../../store/offers/slice";
import Loader from "../loader";
import {AuthorizationStatus} from "../../store/user/slice";
import {Link} from "react-router-dom";
import Routes from "../../routes";
import Header from "../header/header";

interface MainPageProps {
  offers: Offer[],
  city: City,
  hoveredOffer?: Offer,
  onLoadOffers: any
  isLoading: boolean,
  authorizationStatus: AuthorizationStatus,
}

const MainPage = ({offers, city, hoveredOffer, onLoadOffers, isLoading, authorizationStatus}: MainPageProps): ReactElement => {

  useEffect(() => {
    onLoadOffers();
  }, []);

  return (
    <>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">

        <Header />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          {
            isLoading && <Loader />
          }
          {
            !isLoading
            && <>
              <div className="tabs">
                <section className="locations container">
                  <CitiesList/>
                </section>
              </div>
              <div className="cities">
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offers.length} places to stay in {city.name}</b>
                    <SortList />
                    <OffersList offers={offers} />
                  </section>
                  <div className="cities__right-section">
                    <Map
                      city={city}
                      offers={offers}
                      className={`cities__map map`}
                      mainOffer={hoveredOffer}
                    />
                  </div>
                </div>
              </div>
            </>
          }
        </main>
      </div>
    </>
  );
};

MainPage.propTypes = {
  offers: PropTypes.array
};

const mapStateToProps = ({offers, city, map, user}: RootState) => {
  const offersCopy = getOffersByCity(offers.offers, city.city.name);

  return {
    offers: sortOffersBySortType(offersCopy, offers.sortType),
    city: city.city,
    hoveredOffer: map.hoveredOffer,
    isLoading: offers.isLoading,
    authorizationStatus: user.authorizationStatus
  };
};


const mapDispatchToProps = (dispatch: any) => ({
  onLoadOffers() {
    dispatch(fetchOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
