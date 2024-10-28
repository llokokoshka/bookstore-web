import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import search from "../img/search-icon.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <div className="header">
        <p className="base-text">Catalog</p>
        <div className="input">
          <img src={search} alt="search" className="input__icon" />
          <input
            type="text"
            placeholder="Search"
            className="input__field"
          ></input>
        </div>
      </div>

      <Link
            className='todo-body__div-button'
            to={`/sign-in`}
          > 
          <button className="base-button">Log in/Sign Up</button>
    </Link>
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
`;
