import React from 'react';
import styled from 'styled-components';

import MainPageBody from '../components/Catalog/MainPageBody';

export default function HomePage() {
  return (
    <PageWrapper>
      <MainPageBody />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
`;
