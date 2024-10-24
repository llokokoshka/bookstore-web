import React from "react";
import styled from "styled-components";

const Header = () => {
  return (<Wrapper>
    <div>sdncvo</div>
  </Wrapper>)
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.large};
`;
