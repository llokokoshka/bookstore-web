import React from 'react';
import styled from 'styled-components';

import RoundButtons from './RoundButton';
import profile from '../../img/User profile button.png';
import cart from '../../img/Cart.png';
import like from '../../img/Heart.png';

const AuthButtons: React.FC = () => {
  return (
    <StyledWrapper>
      <RoundButtons url={`/cart`} img={cart} />
      <RoundButtons url={`/profile`} img={like} />
      <RoundButtons url={`/profile`} img={profile} />
    </StyledWrapper>
  );
};

export default AuthButtons;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 27px;
`;
