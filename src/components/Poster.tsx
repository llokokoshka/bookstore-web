import React from "react";
import styled from "styled-components";
// import logo from "../img/logo.png";
import poster from "../img/poster-img.png";

const Poster: React.FC = () => {
  return (
    <Wrapper>
      
      <div className="header">
        <h5>Catalog</h5>
        <div className="header__input">
          {/* <img src={search} alt="search" className="input__icon" /> */}
          <input
            type="text"
            placeholder="Search"
            className="input__field"
          ></input>
        </div>
      </div>

      <button className="button">Choose a book</button>
      <img src={poster} alt="logo" />
    </Wrapper>
  );
};

export default Poster;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.header};

  
`;
