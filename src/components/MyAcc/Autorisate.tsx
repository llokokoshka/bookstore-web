import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";
import LogIn from "./BodyLogIn";

const Autorizate: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <LogIn />
      <Footer />
    </Wrapper>
  );
};

export default Autorizate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
