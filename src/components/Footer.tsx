import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../assets/img/footer-logo.png';
import map from '../assets/img/map.png';
import { AppPages } from '../constants/textConstants';
import { useAppSelector } from '../hooks';

const Footer: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <StyledWrapper>
      <div className="contacts">
        <Link to={`${AppPages.base}`} className="footer-text__menu">
          <img src={logo} alt="logo" />
        </Link>
        <div className="contacts__footer-text">
          <a
            href="mailto:tranthuy.nute@gmail.com&body=''?subject=book store"
            className="correct-view"
          >
            tranthuy.nute@gmail.com
          </a>
          <a href="tel:+14805550103" className="correct-view">
            (480) 555-0103
          </a>
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

  ${({ theme }) => theme.media.tablet} {
    padding: 73px 15px;
  }
  ${({ theme }) => theme.media.mobile} {
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

  .correct-view {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.light};
  }
  .correct-view:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.green};
  }
  .map {
    ${({ theme }) => theme.media.tablet} {
      width: 290px;
      height: auto;
    }
    ${({ theme }) => theme.media.mobile} {
    }
  }
  .footer-text__menu {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.green};
    }
  }
`;
