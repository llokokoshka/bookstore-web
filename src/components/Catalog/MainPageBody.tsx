import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import Autorize from './Autorize';

const MainPageBody = () => {
  return (
    <StyledWrapper>
      <Header />
      <Poster />
      <SortMenu />
      <Autorize />
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
