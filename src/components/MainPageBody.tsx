import React from "react";
import styled from "styled-components";
import Header from "./Header";

const MainPageBody = () => {
  return (<Header />)
};

export default MainPageBody;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.large};
`;
