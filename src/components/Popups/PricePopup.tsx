import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReactSlider from 'react-slider';
import { setMaxPrice, setMinPrice } from '../../store/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '../../api/urlApi';

const PricePopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = useAppSelector((state) => state.filters.minPrice);
  const maxPrice = useAppSelector((state) => state.filters.maxPrice);

  const handleSliderChangeMax = (value: string) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      maxPriceParam: value,
    });
    dispatch(setMaxPrice(Number(value)));
  };

  const handleSliderChangeMin = (value: string) => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
      minPriceParam: value,
    });
    dispatch(setMinPrice(Number(value)));
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
      {/* <label>
        Price Range: {minPrice} - {maxPrice}
      </label>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min={minPrice}
        max={maxPrice}
        value={[minPrice, maxPrice]}
        onChange={handleSliderChange}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      /> */}
    </StyledWrapper>
  );
};

export default PricePopup;

const StyledWrapper = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.light};
  width: 413px;
  height: 151px;
  top: 724px;
  right: 80px;
  padding: 15px 0px 0px 0px;
  gap: 10px;
  border-radius: 16px 0px 0px 0px;
  opacity: 0px;

  .horizontal-slider {
    width: 100%;
    max-width: 500px;
    height: 100vh;
    margin: auto;
  }
  .example-thumb {
    cursor: pointer;
    position: absolute;
    z-index: 100;
    background: #ffffff;
    border: 5px solid #3774ff;
    border-radius: 100%;
    display: block;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 44%);
  }
  .example-thumb.active {
    background-color: grey;
  }
  .example-track {
    position: relative;
    background: #ddd;
  }
  .example-track.example-track-0 {
    background: #83a9ff;
  }
  .horizontal-slider .example-track {
    top: 20px;
    height: 4px;
  }
  .horizontal-slider .example-thumb {
    top: 12px;
    width: 10px;
    outline: none;
    height: 10px;
    line-height: 38px;
  }
`;
