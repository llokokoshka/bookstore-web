import React from 'react';
import styled from 'styled-components';

import logo from '../img/footer-logo.png';
import map from '../img/map.png';

const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="contacts">
        <img src={logo} alt="logo" />
        <div className="contacts__footer-text">
          <div>tranthuy.nute@gmail.com</div>
          <div>(480) 555-0103</div>
        </div>
      </div>
      <div className="contacts__footer-text">
        <div>Home Page</div>
        <div>Catalog</div>
        <div>My Account</div>
        <div>Cart</div>
      </div>
      <div className="contacts__footer-text">
        <div>6391 Elgin St. Celina, Delaware 10299</div>
        <img src={map} alt="map" className="map" />
      </div>
    </StyledWrapper>
  );
};

export default Footer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.padding.footer};

  @media screen and (max-width: 835px) {
    padding: 73px 15px;
  }
  @media screen and (max-width: 321px) {
    flex-direction: column;
    max-width: 290px;
    height: auto;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 40px;
  }

  .contacts__footer-text {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 5px;
  }
  .map {
    @media screen and (max-width: 835px) {
      width: 290px;
      height: auto;
    }
    @media screen and (max-width: 321px) {
    }
  }
`;
