import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortBy } from '../../store/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '../../api/urlApi';

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
      {sortOptions.map((option) => (
        <div
          className="base-text"
          key={option}
          onClick={() => handleSortOption(option)}
          style={{ fontWeight: sortBy === option ? 'bold' : 'normal' }}
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
  height: 226px;
  top: 78px;
  padding: 15px;
  gap: 12px;
  border-radius: 16px;
  opacity: 0px;
  z-index: 6;
`;
