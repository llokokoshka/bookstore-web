import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';
import SignUpBody from './BodySignUp';

const SignUp: React.FC = () => {
  return (
    <StyledWrapper>
      <Header />
      <SignUpBody />
      <Footer />
    </StyledWrapper>
  );
};

export default SignUp;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
