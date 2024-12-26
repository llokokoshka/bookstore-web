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
  const itemsInFav = useAppSelector(
    (state) => state.favorite.numberOfItemsInFavorite
  );

  return (
    <StyledWrapper>
      <Link to={AppPages.base}>
        <img src={logo} alt="logo" id="logo" />
      </Link>
      <div className="base-text base-text--order" id="pageName">
        {props.page}
      </div>
      <Search className="header-search" />
      {user ? (
        <UserButtons
          itemsInCart={itemsInCart}
          itemsInFav={itemsInFav}
          buttonsClassName="user-buttons--order"
        />
      ) : (
        <AuthButton page={props.page} buttonsClassName="user-buttons--order" />
      )}
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-areas: 'logo pageName search buttons';
  grid-template-columns: 1fr 1fr 4fr 2fr;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.base};
  position: relative;

  ${({ theme }) => theme.media.tablet} {
    padding: 20px 15px;
  }
  ${({ theme }) => theme.media.mobile} {
    grid-template-areas:
      'logo pageName  buttons'
      'search search search';
    grid-template-columns: 1fr 1fr 2fr;
  }
  #logo {
    grid-area: logo;
    ${({ theme }) => theme.media.mobile} {
      width: 62px;
      height: 31px;
    }
  }
  .header-search {
    grid-area: search;
    width: 100%;

    ${({ theme }) => theme.media.mobile} {
      grid-column: 1 / span 3;
      margin-top: 10px;
      max-width: none;
    }
  }
  .base-text--order {
    grid-area: pageName;
    text-align: center;
    ${({ theme }) => theme.media.mobile} {
      /* text-align: start; */
    }
  }
  .user-buttons--order {
    grid-area: buttons;
    justify-self: end;

    ${({ theme }) => theme.media.mobile} {
      justify-self: end;
    }
  }
`;
