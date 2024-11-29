import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../img/logo.png';
import search from '../../img/search-icon.png';
import AuthButtons from './AuthButtons';
import { useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <StyledWrapper>
      <Link to={AppPages.base}>
        <img src={logo} alt="logo" />
      </Link>
      <div className="header">
        <div className="base-text">Catalog</div>
        <div className="input">
          <img src={search} alt="search" className="input__icon" />
          <input
            type="text"
            placeholder="Search"
            className="input__field"
          ></input>
        </div>
      </div>
      {user !== null && user !== undefined ? (
        <AuthButtons />
      ) : (
        <Link className="todo-body__div-button" to={`/sign-in`}>
          <button className="base-button">Log in/Sign Up</button>
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
  column-gap: 127px;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.header};
  position: relative;

  .header {
    display: flex;
    flex-direction: row;
    width: 739px;
    align-items: center;
    column-gap: 43px;
  }
`;
