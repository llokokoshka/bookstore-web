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
    console.log(sortOption);
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
  top: 724px;
  right: 80px;
  padding: 16px 15px 16px 15px;
  gap: 12px;
  border-radius: 16px 0px 0px 0px;
  opacity: 0px;
`;
