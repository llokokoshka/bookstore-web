import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import search from '../../img/search-icon.png';
import { useAppDispatch } from '../../hooks';
import { setSearcheParam } from '../../store/filter/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

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

  return (
    <StyledWrapper>
      <div className="input">
        <img src={search} alt="search" className="input__icon" />
        <input
          type="text"
          placeholder="Search"
          className="input__field --correct-size"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={(e) => (e.code === 'Enter' ? setSearch() : null)}
        ></input>
      </div>
    </StyledWrapper>
  );
};

export default Search;

const StyledWrapper = styled.div`
  position: relative;
  .--correct-size {
    @media screen and (max-width: 834px) {
      width: 247px;
    }
  }
`;
