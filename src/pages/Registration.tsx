import React from 'react';
import styled from 'styled-components';

import Registration from '../components/Reg/Registration';

export default function RegistrationPage() {
  return (
    <PageWrapper>
      <Registration />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;
