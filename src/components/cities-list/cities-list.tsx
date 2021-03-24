import React, {ReactElement} from 'react';
import City from '../../models/city';
import {connect} from "react-redux";
import {RootState} from "../../store";
import {changeCity} from "../../store/city/slice";
import {Dispatch} from "redux";
import {CITIES} from "../../mocks/cities";

interface CitiesListProps {
  activeCity: City,
  handleCityChange: Dispatch<any>
}

const CitiesList = (props: CitiesListProps): ReactElement => {
  const {activeCity, handleCityChange} = props;
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
                onClick={() => handleCityChange(city)}
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

const mapStateToProps = (state: RootState) => ({
  activeCity: state.city.city
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleCityChange(newCity: City): void {
    dispatch(changeCity(newCity));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
