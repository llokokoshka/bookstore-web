import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Poster from "./Poster";
import SortMenu from "./SortMenu";

const MainPageBody = () => {
  return (
    <Wrapper>
      <Header />
      <Poster />
      <SortMenu />
      <Footer />
    </Wrapper>
  );
};

export default MainPageBody;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* justify-content: space-between; */
  /* align-items: center; */
 
`;
