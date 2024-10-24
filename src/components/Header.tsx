import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <h5>Catalog</h5>
      <input type="text" placeholder="Search"></input>
      <button className="header-button">Log in/ Sign Up</button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.header};

  .header-button {
    width: 231px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    opacity: 0px;
    color: white;
    background-color: #344966;
  }
`;
