import React, {useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../store";
import SortType from "../../models/sort-type";
import {Dispatch} from "redux";
import {setSortType} from "../../store/offers/slice";

const SortTypesMap = {
  [SortType.POPULAR]: `Popular`,
  [SortType.PRICE_ASC]: `Price: low to high`,
  [SortType.PRICE_DESC]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
};

const getSortTypeLabel = (sortType: SortType): string => SortTypesMap[sortType];

interface SortListProps {
  selectedSortType: SortType,
  handleSortTypeChange: any
}

const SortList = ({selectedSortType, handleSortTypeChange}: SortListProps) => {
  const [isHovered, setIsHovered] = useState<boolean>();
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
      >
        {getSortTypeLabel(selectedSortType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isHovered ? `places__options--opened` : ``}`}>
        {
          Object
            .keys(SortTypesMap)
            .map((sortType: SortType, i: number) => {
              const isActive = selectedSortType === sortType;
              return (
                <li
                  key={`sortType-${i}`}
                  className={`places__option ${isActive ? `places__option--active` : ``}`}
                  tabIndex={0}
                  onClick={() => handleSortTypeChange(sortType)}
                >
                  {getSortTypeLabel(sortType)}
                </li>
              );
            })
        }
      </ul>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedSortType: state.offers.sortType
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSortTypeChange: (sortType: SortType) => dispatch(setSortType(sortType))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortList);
