import React from "react";
import styled from "styled-components";
import logo from "../img/footer-logo.png";
import map from '../img/map.png'

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <img src={logo} alt="logo" />
        <h5>tranthuy.nute@gmail.com</h5>
        <h5>(480) 555-0103</h5>
      </div>
      <div>
        <h5>Home Page</h5>
        <h5>Catalog</h5>
        <h5>My Account</h5>
        <h5>Cart</h5>
      </div>
      <div>
        <h5>6391 Elgin St. Celina, Delaware 10299</h5>
        <img src={map} alt="map"/>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: ${({ theme }) => theme.padding.large};
`;
