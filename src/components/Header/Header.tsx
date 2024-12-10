import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../img/logo.png';
import search from '../../img/search-icon.png';
import AuthButtons from './AuthButtons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { setSearcheParam } from '../../store/filter/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';

const Header: React.FC<{ page: string }> = (props) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearch = () => {
    if (searchInput.length > 0) {
      dispatch(setSearcheParam(searchInput));
      setQueryParams({
        dispatch: dispatch,
        searchParams: searchParams,
        setSearchParams: setSearchParams,
        search: searchInput,
      });
    } else {
      searchParams.delete('search');
    }
  };

  const deleteSearchParams = () => {
    searchParams.delete('pageNum');
    searchParams.delete('genres');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    searchParams.delete('sortBy');
    searchParams.delete('search');
  };

  return (
    <StyledWrapper>
      <Link to={AppPages.base}>
        <img src={logo} alt="logo" onClick={deleteSearchParams} />
      </Link>
      <div className="header">
        <div className="base-text">{props.page}</div>
        <div className="input">
          <img src={search} alt="search" className="input__icon" />
          <input
            type="text"
            placeholder="Search"
            className="input__field"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={(e) => (e.code === 'Enter' ? setSearch() : null)}
          ></input>
        </div>
      </div>
      {user !== null && user !== undefined ? (
        <AuthButtons />
      ) : props.page === 'Login' ? (
        <Link className="todo-body__div-button" to={`${AppPages.registration}`}>
          <button className="base-button">Log in/Sign Up</button>
        </Link>
      ) : (
        <Link className="todo-body__div-button" to={`${AppPages.login}`}>
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
