import React, {memo, ReactElement} from 'react';
import City from '../../models/city';
import {RootState} from "../../store";
import {changeCity} from "../../store/city/slice";
import {CITIES} from "../../mocks/cities";
import {useDispatch, useSelector} from "react-redux";

const CitiesList = (): ReactElement => {
  const {city: activeCity} = useSelector((state: RootState) => state.city);
  const dispatch = useDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES
        .map((city: City) => {
          const activeClass = activeCity === city ? `tabs__item--active` : ``;
          return (
            <li className="locations__item" key={`city-${city.name}`}>
              <a
                className={`locations__item-link tabs__item ${activeClass}`}
                href="#"
                onClick={() => dispatch(changeCity(city))}
              >
                <span>{city.name}</span>
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};

export default memo(CitiesList);
