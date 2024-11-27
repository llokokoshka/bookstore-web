import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setMaxPrice, setMinPrice } from '../../store/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '../../api/urlApi';

const PricePopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = useAppSelector((state) => state.filters.minPrice);
  const maxPrice = useAppSelector((state) => state.filters.maxPrice);

  const handleSliderChangeMin = (value: string) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      minPriceParam: value,
    });
    dispatch(setMinPrice(Number(value)));
  };

  const handleSliderChangeMax = (value: string) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      maxPriceParam: value,
    });
    dispatch(setMaxPrice(Number(value)));
  };

  return (
    <StyledWrapper>
      {minPrice}
      <input
        type="range"
        id="lower"
        value={minPrice}
        onChange={(e) => handleSliderChangeMin(e.target.value)}
        min="0"
        max="100"
        step="5"
      />
      {maxPrice}
      <input
        type="range"
        id="upper"
        value={maxPrice}
        onChange={(e) => handleSliderChangeMax(e.target.value)}
        min="0"
        max="100"
        step="5"
      />
    </StyledWrapper>
  );
};

export default PricePopup;

const StyledWrapper = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.light};
  width: 413px;
  height: 151px;
  top: 74px;
  padding: 15px;
  gap: 10px;
  border-radius: 16px;
  opacity: 0px;
  z-index: 6;
`;
