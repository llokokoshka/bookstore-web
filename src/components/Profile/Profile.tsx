import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';
import Profile from './BodyProfile';

const ProfileAll: React.FC = () => {
  return (
    <StyledWrapper>
      <Header />
      <Profile />
      <Footer />
    </StyledWrapper>
  );
};

export default ProfileAll;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
