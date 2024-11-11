import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import AuthorizationBody from './BodyAuthorization';

const Authorization: React.FC = () => {
  return (
    <StyledWrapper>
      <Header />
      <AuthorizationBody />
      <Footer />
    </StyledWrapper>
  );
};

export default Authorization;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
