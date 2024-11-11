import React from 'react';
import styled from 'styled-components';

import forward from '../../img/forward.png';

const SortMenu: React.FC = () => {
  return (
    <StyledWrapper>
      <p className="big-title">Catalog</p>
      <div className="all-buttons">
        <div className="button-container">
          <button className="grey-button">Genre</button>
          <img src={forward} alt="arrow" className="arrow" />
        </div>
        <div className="button-container">
          <button className="grey-button">Price</button>
          <img src={forward} alt="arrow" className="arrow" />
        </div>
        <div className="button-container ">
          <button className="grey-button light">Sort by price </button>
          <img src={forward} alt="arrow" className="arrow" />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default SortMenu;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.header};

  .all-buttons {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }
  .button-container {
    display: flex;
  }
  .button-container:hover {
    cursor: pointer;
  }

  .grey-button {
    background-color: ${({ theme }) => theme.colors.light};
    width: 196px;
    height: 48px;
    padding: 10px 8px 10px 15px;
    border-radius: 16px;
    text-align: start;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    color: ${({ theme }) => theme.colors.dark_blue};
  }

  .arrow {
    position: absolute;
    padding: 12px 8px 12px 164px;
  }
  .light {
    background-color: white;
  }
`;
