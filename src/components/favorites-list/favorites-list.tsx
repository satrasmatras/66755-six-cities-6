import React, {ReactElement, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from "../place-card";
import PlaceCardTypes from "../../models/placeCardTypes";
import Offer from "../../models/offer";
import {toCapitalize} from "../../utils";

interface FavoritesListProps {
  favoriteOffers: Offer[],
}

const FavoritesList = ({favoriteOffers}: FavoritesListProps): ReactElement => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupMap = new Map();

    favoriteOffers.forEach((offer) => {
      const {city: {name}} = offer;

      if (groupMap.has(name)) {
        const currentGroup = groupMap.get(name);
        groupMap.set(name, [...currentGroup, offer]);
      } else {
        groupMap.set(name, [offer]);
      }
    });

    setGroups(Array.from(groupMap.entries()));
  }, [favoriteOffers]);

  return (
    <ul className="favorites__list">
      {groups.map(([city, offers], i) => {
        return (
          <li className="favorites__locations-items" key={`pair${i}`}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{toCapitalize(city)}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {offers.map((offer: Offer, i: number) => <PlaceCard cardType={PlaceCardTypes.FAVORITE} key={i} offer={offer} />)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

FavoritesList.propTypes = {
  offers: PropTypes.array,
};

export default FavoritesList;
