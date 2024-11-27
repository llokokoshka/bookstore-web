import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from '@mui/material/Slider';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setMaxPrice, setMinPrice } from '../../store/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '../../api/urlApi';
import ReactSlider from 'react-slider';
import { set } from 'react-hook-form';

const PricePopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let minPrice = useAppSelector((state) => state.filters.minPrice) || 0;
  let maxPrice = useAppSelector((state) => state.filters.maxPrice) || 100;

  const [value, setValue] = React.useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = async (newValue: number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
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

  const handleSliderChangeMin = async (value: number) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
    });
  };

  const handleSliderChangeMax = (value: number) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      maxPriceParam: value.toString(),
    });
  };

  return (
    <StyledWrapper>
      <div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={value}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          minDistance={10}
          onChange={handleChange}
        />
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

  .example-thumb {
    background-color: ${({ theme }) => theme.colors.green};
  }
  .example-track {
    background-color: ${({ theme }) => theme.colors.dark_green};
  }
  .horizontal-slider {
    background-color: ${({ theme }) => theme.colors.light_grey};
  }
`;

const StyledSlider = styled(Slider)``;
