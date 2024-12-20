import React from 'react';
import styled from 'styled-components';

import logo from '../img/footer-logo.png';
import map from '../img/map.png';
import { Link } from 'react-router-dom';
import { AppPages } from '../constants/textConstants';
import { useAppSelector } from '../hooks';

const Footer: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

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
        <Link to={`${AppPages.base}`} className="footer-text__menu">
          <div>Home Page</div>
        </Link>
        <Link to={`${AppPages.base}`} className="footer-text__menu">
          <div>Catalog</div>
        </Link>
        {user && (
          <Link to={`${AppPages.profile}`} className="footer-text__menu">
            <div>My Account</div>
          </Link>
        )}
        {user && (
          <Link to={`${AppPages.cart}`} className="footer-text__menu">
            <div>Cart</div>
          </Link>
        )}
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
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.padding.footer};

  @media screen and (max-width: 834px) {
    padding: 73px 15px;
  }
  @media screen and (max-width: 320px) {
    flex-direction: column;
    align-items: start;
    padding-bottom: 30px;
    row-gap: 40px;
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
    @media screen and (max-width: 834px) {
      width: 290px;
      height: auto;
    }
    @media screen and (max-width: 321px) {
    }
  }
  .footer-text__menu {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
`;
