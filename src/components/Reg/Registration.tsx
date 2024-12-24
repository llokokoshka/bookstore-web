import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import RegistrationBody from './BodyRegistration';
import Footer from '../Footer';

const Registration: React.FC = () => {
  return (
    <StyledWrapper>
      <Header page="Registration" />
      <RegistrationBody />
      <Footer />
    </StyledWrapper>
  );
};

export default Registration;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
