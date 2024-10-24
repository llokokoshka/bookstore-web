import React from "react";
import styled from "styled-components";

import MainPageBody from "../components/MainPageBody";

export default function App() {
  return (
    <PageWrapper>
      <MainPageBody />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;

  .title {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 40px;
    font-size: 120px;
    width: 100%;

    @media screen and (max-width: 390px) {
      font-size: 80px;
    }
  }
`;
