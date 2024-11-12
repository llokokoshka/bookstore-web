import React from 'react';
import styled from 'styled-components';

interface Props {
  id: number | undefined;
  img: string | undefined;
  name: string | undefined;
  author: string | undefined;
  description: string | undefined;
  price: number | undefined;
  comments: [] | undefined;
}

const BookPageBody: React.FC<Props> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/uploads/books/`;

  return (
    <StyledWrapper>
      <img src={dirname + props.img} alt="img" className="img-book"></img>
      <div className="info-block">
        <div className="big-title">{props.name}</div>
        <div className="normal-title">{props.author}</div>
        <div>
          <div className="normal-title">Description</div>
          <div className="base-text">{props.description}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default BookPageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: row;
  column-gap: 128px;

  .img-book {
    width: 522px;
    height: 779px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }
`;
