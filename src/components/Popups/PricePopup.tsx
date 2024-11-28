import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setMaxPrice, setMinPrice } from '../../store/filterSlice';
import { setQueryParams } from '../../api/urlApi';

const PricePopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let minPrice = useAppSelector((state) => state.filters.minPrice) || 0;
  let maxPrice = useAppSelector((state) => state.filters.maxPrice) || 100;

  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = async (newValue: number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    console.log('get new values: ', newValue);
    setValue(newValue);
    dispatch(setMinPrice(newValue[0]));
    dispatch(setMaxPrice(newValue[1]));
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      minPriceParam: newValue[0].toString(),
      maxPriceParam: newValue[1].toString(),
    });
  };

  return (
    <StyledWrapper>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        // trackClassName="track"
        defaultValue={value}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`${state.index === 1 ? 'track track-active' : 'track'}`}
          />
        )}
        pearling
        minDistance={10}
        onAfterChange={handleChange}
      />
      <div className="price-pop">
        <div>{value[0]},00$</div>
        <div>{value[1]},00$</div>
      </div>
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

  .thumb {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 32px;
    height: 32px;
    left: 54px;
    gap: 0px;
    border-radius: 40px;
    border: ${({ theme }) => theme.border.green};
    opacity: 0px;
  }

  .track {
    height: 12px;
    top: 10px;
    gap: 0px;
    border-radius: 40px;
    opacity: 0px;
    background-color: #d6d8e7;
  }

  .track-active {
    background-color: #bfcc94;
  }

  .horizontal-slider {
    color: ${({ theme }) => theme.colors.dark_blue};
  }

  .price-pop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 37px;
    width: 379px;
  }
`;
const StyledTrack = styled.div<{ index: number }>`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? '#BFCC94' : '#d6d8e7')};
`;
