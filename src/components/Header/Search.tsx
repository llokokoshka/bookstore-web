import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';

import search from '../../img/search-icon.png';
import { useAppDispatch } from '../../hooks';
import { setSearcheParam } from '../../store/filter/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';
import { BaseInput } from '../BaseInput';

const Search: React.FC<{
  className?: string;
  inputClassName?: string;
}> = (props) => {
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
    <StyledWrapper className={props.className}>
      <BaseInput>
        <img src={search} alt="search" className="input__icon" />
        <input
          type="text"
          placeholder="Search"
          className={cn(
            'input__field input__field--size',
            props.inputClassName
          )}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={(e) => (e.code === 'Enter' ? setSearch() : null)}
        ></input>
      </BaseInput>
    </StyledWrapper>
  );
};

export default Search;

const StyledWrapper = styled.div`
  /* position: relative;
  width: 100%; */

  .input__field--size {
    @media screen and (max-width: 834px) {
      max-width: 247px;
      width: 100%;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      width: 100%;
    }
  }
`;
