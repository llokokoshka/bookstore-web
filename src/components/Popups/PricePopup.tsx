import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

import poligon from '../../assets/img/Polygon 4.png';

const PricePopup: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 100;

  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = async (newValue: number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValue(newValue);

    searchParams.set('minPrice', newValue[0].toString());
    searchParams.set('maxPrice', newValue[1].toString());

    if (newValue[0] === 0) {
      searchParams.delete('minPrice');
    }

    if (newValue[1] === 100) {
      searchParams.delete('maxPrice');
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
  };

  return (
    <StyledWrapper>
      <img src={poligon} alt="aa" className="poligon" />
      <div className="main-block">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          defaultValue={value}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => (
            <div {...props} key={props.key}>
              {state.valueNow}
            </div>
          )}
          renderTrack={(props, state) => (
            <div
              {...props}
              key={props.key}
              className={`${
                state.index === 1 ? 'track track-active' : 'track'
              }`}
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
      </div>
    </StyledWrapper>
  );
};

export default PricePopup;

const StyledWrapper = styled.div`
  position: absolute;
  top: 74px;

  .poligon {
    position: absolute;
    left: 11px;
    top: -11px;
    z-index: 15;
  }
  .main-block {
    position: absolute;
    background: ${({ theme }) => theme.colors.light};
    width: 413px;
    height: auto;
    padding: 40px 18px;
    border-radius: 16px;
    opacity: 0px;
    box-shadow: 5px 5px 15px ${({ theme }) => theme.colors.dark_blue};

    z-index: 15;

    ${({ theme }) => theme.media.mobile} {
      width: 290px;
      padding: 40px 10px;
      z-index: 12;
    }
  }

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
    &:hover {
      cursor: pointer;
    }
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
    ${({ theme }) => theme.media.mobile} {
      width: 270px;
    }
  }
`;
