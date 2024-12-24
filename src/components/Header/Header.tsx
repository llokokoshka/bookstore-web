import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../assets/img/logo.png';
import UserButtons from './UserButtons';
import { useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import Search from './Search';
import AuthButton from './AuthButton';

type Props = {
  page: string;
};

const Header: React.FC<Props> = (props) => {
  const itemsInCart = useAppSelector((state) => state.cart.numberOfItemsInCart);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <StyledWrapper>
      <Link to={AppPages.base}>
        <img src={logo} alt="logo" id="logo" />
      </Link>
      <div className="base-text" id="pageName">
        {props.page}
      </div>
      <Search className="header-search" />
      {user ? (
        <UserButtons itemsInCart={itemsInCart} />
      ) : (
        <AuthButton page={props.page} />
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
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.base};
  position: relative;

  @media screen and (max-width: 834px) {
    padding: 20px 15px;
  }
  @media screen and (max-width: 320px) {
    flex-wrap: wrap;
    padding: 20px 15px;
  }
  #logo {
    @media screen and (max-width: 320px) {
      width: 62px;
      height: 31px;
    }
  }
  .header-search {
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
`;
