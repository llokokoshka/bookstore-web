import React from "react";
import styled from "styled-components";
import logo from "../img/footer-logo.png";
import map from "../img/map.png";

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <div className="contacts">
        <img src={logo} alt="logo" />
        <div className="footer-text">
          <p>tranthuy.nute@gmail.com</p>
          <p>(480) 555-0103</p>
        </div>
      </div>
      <div className="footer-text">
        <p>Home Page</p>
        <p>Catalog</p>
        <p>My Account</p>
        <p>Cart</p>
      </div>
      <div className="footer-text">
        <p>6391 Elgin St. Celina, Delaware 10299</p>
        <img src={map} alt="map" />
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
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.padding.footer};
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 40px;
  }
  .footer-text {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 5px;
  }
`;
