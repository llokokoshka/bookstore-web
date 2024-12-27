import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import poligon from '../../assets/img/Polygon 4.png';
import { SORT_OPTIONS } from '../../constants/textConstants';

const SortPopup: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy');

  const handleSortOption = async (sortOption: string) => {
    searchParams.set('sortBy', sortOption);

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
  };

  return (
    <StyledWrapper>
      <img src={poligon} alt="aa" className="poligon" />

      {SORT_OPTIONS.map((option) => (
        <div
          className="base-text base-text--size"
          key={option}
          onClick={() => handleSortOption(option)}
          style={{
            color:
              !sortBy && 'Price' === option
                ? '#344966'
                : sortBy === option
                ? '#344966'
                : '#B9BAC3',
          }}
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
  top: 74px;
  padding: 15px;
  gap: 12px;
  border-radius: 16px;
  opacity: 0px;
  box-shadow: 5px 5px 15px ${({ theme }) => theme.colors.dark_blue};

  z-index: 15;
  ${({ theme }) => theme.media.mobile} {
    width: 290px;
  }

  .poligon {
    position: absolute;
    left: 11px;
    top: -11px;
    z-index: 6;
  }
  .base-text--size {
    height: 34px;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: left;

    &:hover {
      cursor: pointer;
    }
  }
`;
