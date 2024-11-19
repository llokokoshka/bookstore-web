import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  img: string;
  id: number | undefined;
  name: string;
  author: string;
  price: number | undefined;
}

const Book: React.FC<Props> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/uploads/books/`;

  if (props.price === undefined) {
    props.price = 0;
  }
  return (
    <StyledWrapper>
      <Link to={`/${props.id}`}>
        <div className="">
          <img src={dirname + props.img} alt="img" className="avatar"></img>
        </div>

        <div className="normal-title">{props.name}</div>
        <div className="base-text">{props.author}</div>
        <div></div>
      </Link>

      <button className="base-button correct">$ {props.price} USD</button>
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
  .correct {
    width: 305px;
    height: 48px;
    top: 615px;
    padding: 10px 50px 10px 50px;
    gap: 0px;
    border-radius: 16px;
  }
`;
