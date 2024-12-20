import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import Book from './Book';

const MainPageBody = () => {
  return (
    <StyledWrapper>
      <Header />
      <Poster />
      <SortMenu />
      <Book img="defImg" name="skmjca" author="string" price={24} />
      <AuthPoster />
      <Footer />
    </StyledWrapper>
  );
};

export default MainPageBody;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
