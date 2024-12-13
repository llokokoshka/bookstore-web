import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../img/logo.png';
import AuthButtons from './AuthButtons';
import { useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import Search from './Search';

const Header: React.FC<{ page: string }> = (props) => {
  const user = useAppSelector((state) => state.auth.user);

  const [searchParams] = useSearchParams();

  const deleteSearchParams = () => {
    searchParams.delete('pageNum');
    searchParams.delete('genres');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    searchParams.delete('sortBy');
    searchParams.delete('search');
  };

  const isUserAvailable = user;

  return (
    <StyledWrapper>
      <Link to={AppPages.base}>
        <img src={logo} alt="logo" id="logo" />
      </Link>
      {/* <div className="header"> */}
      <div className="base-text" id="pageName">
        {props.page}
      </div>
      <Search className="header-search" />
      {/* </div> */}
      {user !== null && user !== undefined ? (
        <AuthButtons />
      ) : props.page === 'Login' ? (
        <Link className="todo-body__div-button" to={`${AppPages.registration}`}>
          <button className="base-button" id="loginButton">
            Log in/Sign Up
          </button>
        </Link>
      ) : (
        <Link className="todo-body__div-button" to={`${AppPages.login}`}>
          <button className="base-button" id="regButton">
            Log in/Sign Up
          </button>
        </Link>
      )}
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  /* column-gap: 127px; */
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.header};
  position: relative;

  @media screen and (max-width: 834px) {
    /* column-gap: 51px; */
    padding: 20px 15px;
  }
  @media screen and (max-width: 320px) {
    flex-wrap: wrap;
    /* column-gap: 18px; */
    padding: 20px 15px;
    /* flex-direction: row; */
  }
  #logo {
    @media screen and (max-width: 320px) {
      width: 62px;
      height: 31px;
    }
  }
  #header-search {
    @media screen and (max-width: 320px) {
      order: 2;
      flex: 1 0 100%;
      margin-top: 10px;
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    width: 739px;
    align-items: center;
    column-gap: 43px;

    @media screen and (max-width: 320px) {
      width: 290px;
    }
  }
  /* .header-search {
    background-color: tomato;
  } */
`;
