import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import ProfileBody from './BodyProfile';
import Footer from '../Footer';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/auth/authThunk';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StyledWrapper>
      <Header page="Profile" />
      <ProfileBody user={user} />
      <Footer />
    </StyledWrapper>
  );
};

export default Profile;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: '100hv';
`;
