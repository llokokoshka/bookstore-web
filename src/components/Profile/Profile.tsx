import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import ProfileBody from './BodyProfile';
import Footer from '../Footer';

const Profile: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StyledWrapper>
      <Header />
      <ProfileBody />
      <Footer />
    </StyledWrapper>
  );
};

export default Profile;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
