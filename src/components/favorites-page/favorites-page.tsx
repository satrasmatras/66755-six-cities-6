import React, {ReactElement, useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import Routes from "../../routes";
import FavoritesList from "../favorites-list";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Loader from "../loader";
import {fetchFavorites, toggleFavorite, ToggleFavoriteTarget} from "../../store/favorites/slice";


const FavoritesPage = (): ReactElement => {
  const dispatch = useDispatch();
  const {favorites: favoriteOffers, isLoading} = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  const handleBookmark = useCallback((offer) => dispatch(toggleFavorite(offer, ToggleFavoriteTarget.FAVORITES)), []);

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
        {
          favoriteOffers?.length > 0 && (
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  {
                    isLoading ? <Loader /> : <FavoritesList favoriteOffers={favoriteOffers} handleBookmark={handleBookmark}/>
                  }
                </section>
              </div>
            </main>
          )
        }
        {
          !favoriteOffers?.length && (
            <main className="page__main page__main--favorites page__main--favorites-empty">
              <div className="page__favorites-container container">
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future
                      trips.</p>
                  </div>
                </section>
              </div>
            </main>
          )
        }

        <footer className="footer container">
          <Link className="footer__logo-link" to={Routes.MAIN}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    </>
  );
};

export default FavoritesPage;
