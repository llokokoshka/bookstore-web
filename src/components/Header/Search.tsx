import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';

import search from '../../img/search-icon.png';
import { useAppDispatch } from '../../hooks';
import { setSearcheParam } from '../../store/filter/filterSlice';
import { BaseInput } from '../BaseComponentsStyles/BaseInput';
import ProfileInput from '../Input fields/ProfileInput';

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
      searchParams.set('search', searchInput);
    } else {
      searchParams.delete('search');
    }
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
  };

  return (
    <StyledWrapper className={props.className}>
      <ProfileInput
        img={search}
        type="text"
        placeholder="Search"
        inputClassName="input__field--size"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyUp={(e) => (e.code === 'Enter' ? setSearch() : null)}
        name="search"
      />
    </StyledWrapper>
  );
};

export default Search;

const StyledWrapper = styled.div`
  /* position: relative;*/
  width: 100%;
  max-width: 630px;
  @media screen and (max-width: 834px) {
    max-width: 247px;
  }
  @media screen and (max-width: 320px) {
    max-width: 290px;
  }
  .input__field--size {
    max-width: 630px;
    width: 100%;
    @media screen and (max-width: 834px) {
      max-width: 247px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
    }
  }
`;
