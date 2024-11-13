import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortBy } from '../../store/filterSlice';

const SortPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const sortOptions = [
    'Price',
    'Name',
    'Author name',
    'Rating',
    'Date of issue',
  ];

  return (
    <StyledWrapper>
      {sortOptions.map((option) => (
        <div
          key={option}
          onClick={() => dispatch(setSortBy(option))}
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
