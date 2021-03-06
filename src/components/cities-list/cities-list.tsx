import React, {ReactElement} from 'react';
import City from '../../models/city';
import {connect} from "react-redux";
import {RootState} from "../../store";
import {changeCity} from "../../store/city/actions";
import {Dispatch} from "redux";

interface CitiesListProps {
  activeCity: City,
  handleCityChange: Dispatch<any>
}

const CitiesList = (props: CitiesListProps): ReactElement => {
  const {activeCity, handleCityChange} = props;
  return (
    <ul className="locations__list tabs__list">
      {
        Object
        .values(City)
        .map((city) => {
          const activeClass = activeCity === city ? `tabs__item--active` : ``;
          return (
            <li className="locations__item" key={`city-${city}`}>
              <a
                className={`locations__item-link tabs__item ${activeClass}`}
                href="#"
                onClick={() => handleCityChange(city)}
              >
                <span>{city}</span>
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
