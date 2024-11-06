import React from 'react';
import styled from 'styled-components';

import logo from '../img/footer-logo.png';
import map from '../img/map.png';

const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="contacts">
        <img src={logo} alt="logo" />
        <div className="footer-text">
          <div>tranthuy.nute@gmail.com</div>
          <div>(480) 555-0103</div>
        </div>
      </div>
      <div className="footer-text">
        <div>Home Page</div>
        <div>Catalog</div>
        <div>My Account</div>
        <div>Cart</div>
      </div>
      <div className="footer-text">
        <div>6391 Elgin St. Celina, Delaware 10299</div>
        <img src={map} alt="map" />
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

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 40px;
  }
  .footer-text {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 5px;
  }
`;
