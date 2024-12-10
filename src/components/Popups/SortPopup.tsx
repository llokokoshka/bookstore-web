import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortBy } from '../../store/filter/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '../../utils/urlUtil';
import poligon from '../../img/Polygon 4.png';

const SortPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const sortOptions = [
    'Price',
    'Name',
    'Author name',
    'Rating',
    'Date of issue',
  ];
  const handleSortOption = async (sortOption: string) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      sortByOption: sortOption,
    });
    dispatch(setSortBy(sortOption));
  };

  return (
    <StyledWrapper>
      <img src={poligon} alt="aa" className="poligon" />

      {sortOptions.map((option) => (
        <div
          className="base-text --sort-param"
          key={option}
          onClick={() => handleSortOption(option)}
          style={{ color: sortBy === option ? '#344966' : '#B9BAC3' }}
        >
          {option}
        </div>
      ))}
    </StyledWrapper>
  );
};

export default SortPopup;

const StyledWrapper = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.light};
  width: 197px;
  height: auto;
  top: 78px;
  padding: 15px;
  gap: 12px;
  border-radius: 16px;
  opacity: 0px;
  z-index: 6;

  .poligon {
    position: absolute;
    left: 11px;
    top: -11px;
    z-index: 6;
  }
  .--sort-param {
    height: 34px;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;
