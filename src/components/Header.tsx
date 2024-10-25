import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import search from "../img/search-icon.png";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <div className="header">
        <p className="base-text">Catalog</p>
        <div className="header__input">
          <img src={search} alt="search" className="input__icon" />
          <input
            type="text"
            placeholder="Search"
            className="input__field"
          ></input>
        </div>
      </div>

      <button className="base-button">Log in/Sign Up</button>
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

  .header {
    display: flex;
    flex-direction: row;
    width: 739px;
    align-items: center;
    /* justify-content: space-between; */
    column-gap: 43px;
  }

  .header__input {
    display: flex;
    flex-direction: row;
    height: 64px;
    width: 100%;
  }

  .input__icon {
    position: absolute;
    padding: 22px 24px;
  }

  .input__field {
    display: flex;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    padding-left: 64px;
    max-width: 630px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
  }
`;
