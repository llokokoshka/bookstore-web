import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import search from '../../assets/img/search-icon.png';
import BaseInput from '../BaseComponents/BaseInput';

type Props = {
  className?: string;
  inputClassName?: string;
};

const Search: React.FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchText = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(currentSearchText);

  const setSearch = () => {
    if (searchInput.length > 0) {
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
      <BaseInput
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
  width: 100%;
  max-width: 630px;
  ${({ theme }) => theme.media.tablet} {
    max-width: 247px;
  }
  ${({ theme }) => theme.media.mobile} {
    max-width: 290px;
  }
  .input__field--size {
    max-width: 630px;
    width: 100%;
    ${({ theme }) => theme.media.tablet} {
      max-width: 247px;
    }
    ${({ theme }) => theme.media.mobile} {
      max-width: 290px;
    }
  }
`;
