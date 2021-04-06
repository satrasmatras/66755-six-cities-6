import React, {ReactElement, useEffect} from 'react';
import Offer from "../../models/offer";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import {RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import City from "../../models/city";
import SortList from "../sort-list/sort-list";
import {fetchOffers} from "../../store/offers/offers";
import Loader from "../loader/loader";
import Header from "../header/header";
import {selectSortedOffers} from "../../store/offers/selectors";
import EmptyMainPage from "../empty-main-page/empty-main-page";

const MainPage = (): ReactElement => {
  const offers: Offer[] = useSelector(selectSortedOffers);
  const isLoading = useSelector((state: RootState) => state.offers.isLoading);
  const city: City = useSelector((state: RootState) => state.city.city);
  const hoveredOffer = useSelector((state: RootState) => state.map.hoveredOffer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  const hasNotOffers = !isLoading && !offers.length;

  if (hasNotOffers) {
    return (
      <EmptyMainPage />
    );
  }

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

export default MainPage;
