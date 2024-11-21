import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer';
import { useAppSelector } from '../../hooks';

const CartPage: React.FC = () => {
  let { id } = useParams();
  const userId = Number(id);

  return (
    <StyledWrapper>
      <Header />

      <Footer />
    </StyledWrapper>
  );
};

export default CartPage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
