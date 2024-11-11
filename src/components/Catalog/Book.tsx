import React from 'react';
import styled from 'styled-components';

interface Props {
  img: string;
  name: string;
  author: string;
  price: number;
}

const Book: React.FC<Props> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/books/uploads/`;

  return (
    <StyledWrapper>
      <div className="">
        <img src={dirname + props.img} alt="img" className="avatar"></img>
      </div>
      <div className="">
        <div className="normal-title">{props.name}</div>
        <div className="base-text">{props.author}</div>
        <div></div>
        <button className="base-button">$ {props.price} USD</button>
      </div>
    </StyledWrapper>
  );
};

export default Book;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
  }
  .poster__img {
    position: absolute;
    bottom: 0;
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;
  }
  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
